import * as GoogleMapsService from '@google/maps';

import { Hoikujo, Position } from './types';

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

class BestEffortGeocoder {

  readonly client;

  constructor(credentials: object) {
    // https://github.com/googlemaps/google-maps-services-js
    this.client = GoogleMapsService.createClient({
      ...credentials,
      Promise,
    });
  }

  async geocode({ address, postalCode }): Promise<Position> {
    const response = await this.client.geocode({
      address: `〒${postalCode} ${address}`,
      language: 'ja',
      region: 'jp',
    }).asPromise();

    if (response.status == 200 && response.json.results.length > 0) {
      return {
        latitude: response.json.results[0].geometry.location.lat,
        longitude: response.json.results[0].geometry.location.lng,
      }
    } else {
      // retry by postalCode
      const response = await this.client.geocode({
        address: `〒${postalCode}`,
        language: 'ja',
        region: 'jp',
      }).asPromise();

      if (response.status == 200 && response.json.results.length > 0) {
        return {
          latitude: response.json.results[0].geometry.location.lat,
          longitude: response.json.results[0].geometry.location.lng,
        }
      }
    }

    throw new Error(`Failed to geocode: ${JSON.stringify({ address, postalCode })}`);
  }
}

export async function injectLocation(items: Array<Hoikujo>): Promise<Array<Hoikujo>> {
  let credentials: object;
  try {
    credentials = require('../google-api-credentials');
  } catch (e) {
    console.error(`No credentials available: ${e}`);
    return items; // nothing to do
  }

  const geocoder = new BestEffortGeocoder(credentials);

  const results: Array<Hoikujo> = [];

  // API Limit: 2500/day, 50/sec
  // https://developers.google.com/maps/documentation/geocoding/usage-limits
  const API_LIMIT_PER_SEC = 50;
  let apiCount = 0;

  for (const item of items) {
    const position = await geocoder.geocode({
      postalCode: item.postalCode,
      address: item.address,
    });

    results.push({
      ...item,
      position,
    });

    if ((++apiCount % API_LIMIT_PER_SEC) === 0) {
      await sleep(1000);
    }
  }

  return results;
}

if (process.argv[1] === __filename) {
  const input = {
    postalCode: '100-8111',
    address: '東京都千代田区千代田1-1',
  } as any;



  console.log('input:', input);
  injectLocation([input]).then(([result]) => {
    console.log('result:', result);
  });
}

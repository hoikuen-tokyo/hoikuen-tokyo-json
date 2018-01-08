import { Hoikujo } from './types';
import { fetchTokyoHoikujoData } from "./tokyo";
import { injectLocation } from './geocoder';

export async function run() {
  const promises = [
    //fetchTokyoNinshoHoikujoData(),
    fetchTokyoHoikujoData(),
  ];

  const nestedItems = await Promise.all(promises);

  // flatten
  let results: Array<Hoikujo> = [];

  for (const items of nestedItems) {
    results = results.concat(items);
  }

  const resultsWithLocation = await injectLocation(results);
  console.log(JSON.stringify(resultsWithLocation, undefined, 2));
}

run();

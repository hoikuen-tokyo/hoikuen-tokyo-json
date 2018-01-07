import { Hoikujo } from './types';
import { fetchTokyoHoikujoData } from "./tokyo";

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

  console.log(JSON.stringify(results, undefined, 2));
}


run();

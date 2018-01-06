import { fetchTokyoNinshoHoikujoData } from "./tokyo.ninsho";
import { Hoikujo } from './types';
import { fetchTokyoMinatokuNinkaHoikujoData } from "./tokyo.minatoku.ninka";



export async function run() {
  const promises = [
    //fetchTokyoNinshoHoikujoData(),
    fetchTokyoMinatokuNinkaHoikujoData(),
  ];

  const nestedItems = await Promise.all(promises);
  // flatten
  let results: Array<Hoikujo> = [];

  for (const items of nestedItems) {
    results = results.concat(items);
  }

  console.log(results);
}


run();

import fetch from 'node-fetch';

import { Hoikujo } from './types';
import { parsePdfToCsv } from './pdfUtils';

const Source = "http://www.city.minato.tokyo.jp/kodomo/kodomo/kodomo/hoikuen/ichiran/k-zante.html";
const SourcePdf = "http://www.city.minato.tokyo.jp/kodomo/kodomo/kodomo/hoikuen/ichiran/documents/h30enitiran.pdf";

function processSheet(sheet, source, kind, modifiedDate) {
  return [];
}

export async function parseTokyoMinatokuNinkaHoikujoData(sourceBuffer: Buffer): Promise<Array<Hoikujo>> {
  const rows = await parsePdfToCsv(sourceBuffer);

  console.log(rows);
  return [
  ];
}

export async function fetchTokyoMinatokuNinkaHoikujoData(url = SourcePdf) {
  const response = await fetch(url);
  const buffer = await response.buffer();
  return parseTokyoMinatokuNinkaHoikujoData(buffer);
}

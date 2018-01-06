import * as xlsx from "xlsx";
import fetch from "node-fetch";

import { Hoikujo, Kind } from "./types";
import { dateFromExcelDate, timeStrFromExcelDate, getMaxColRow } from './excelUtils';

const jaconv = require("jaconv"); // FIXME: jaconv is not a module

const Source =　"http://www.fukushihoken.metro.tokyo.jp/kodomo/hoiku/ninsyo/ichiran.html";
const SourceExcel = "http://www.fukushihoken.metro.tokyo.jp/kodomo/hoiku/ninsyo/ichiran.files/ninsyouichiran171201.xlsx";

const NinshoA = "認証Ａ型（行政順）";
const NinshoB = "認証Ｂ型（行政順）";

function processSheet(sheet: xlsx.WorkSheet, source: string, kind: Kind, modifiedDate?: Date) {
  const { maxCol, maxRow } = getMaxColRow(sheet);

  const results: Array<Hoikujo> = [];

  for (let i = 1; i <= maxRow; i++) {
    const localId = sheet[`A${i}`];
    if (localId && localId.t === 'n') {
      const id = `東京都/${kind}/${localId.w}`;
      const name = jaconv.normalize(sheet[`B${i}`].w);
      const postalCode = undefined; // TODO
      const prefecture = '東京都';
      const address = jaconv.normalize(sheet[`C${i}`].w);
      const managementAgency = jaconv.normalize(sheet[`E${i}`].w);
      const openTime = timeStrFromExcelDate(sheet[`F${i}`].v);
      const closeTime = timeStrFromExcelDate(sheet[`H${i}`].v);
      const capacity = sheet[`I${i}`].v;
      const establishedDate = dateFromExcelDate(sheet[`K${i}`].v);
      const tell = jaconv.normalize(sheet[`L${i}`].w);

      results.push({
        id ,
        name,
        postalCode,
        prefecture,
        address,
        managementAgency,
        openTime,
        closeTime,
        capacity,
        establishedDate,
        kind,
        tell,
        source,
        modifiedDate,
      });
    }
  }

  return results;
}

export async function parseTokyoNinshoHoikujoData(sourceBuffer: Buffer): Promise<Array<Hoikujo>> {
  const book = xlsx.read(sourceBuffer);
  const modifiedDate = book.Props!.ModifiedDate;
  console.assert(modifiedDate);

  return [
    ...processSheet(book.Sheets[NinshoA], Source, "認証A型", modifiedDate),
    ...processSheet(book.Sheets[NinshoB], Source, "認証B型", modifiedDate),
  ];
}

export async function fetchTokyoNinshoHoikujoData(url = SourceExcel) {
  const response = await fetch(url);
  const buffer = await response.buffer();
  return parseTokyoNinshoHoikujoData(buffer);
}


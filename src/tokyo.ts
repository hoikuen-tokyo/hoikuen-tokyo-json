import fetch from 'node-fetch';
import * as xlsx from 'xlsx';
const jaconv = require('jaconv');

import { Hoikujo } from './types';
import { getMaxColRow } from './excelUtils';

const Prefecture = '東京都';

/**
 *  東京都福祉保健局 > 福祉保健の基盤づくり > 社会福祉法人・施設情報 > 社会福祉施設等一覧 > 施設等一覧
 *  As of 2017/10/1
 */
const Source = "http://www.fukushihoken.metro.tokyo.jp/kiban/fukushi_shisetsu/shs_list/shisetsuitiran.html";
const SourceExcel = "http://www.fukushihoken.metro.tokyo.jp/kiban/fukushi_shisetsu/shs_list/shisetsuitiran.files/201710-1-1.xls"

export async function parseTokyoHoikujoData(sourceBuffer: Buffer): Promise<Array<Hoikujo>> {
  const book = xlsx.read(sourceBuffer);

  console.assert(Object.values(book.Sheets).length === 1);
  const sheet = Object.values(book.Sheets)[0];

  const modifiedDate = book.Props!.ModifiedDate;

  const { maxCol, maxRow } = getMaxColRow(sheet);

  const items: Array<Hoikujo> = [];

  for (let i = 1; i <= maxRow; i++) {
    const postalCode1: xlsx.CellObject | undefined = sheet[`C${i}`];
    const postalCode2: xlsx.CellObject | undefined = sheet[`E${i}`];

    if (postalCode1 && /^\d+$/.test(postalCode1.w!)
      && postalCode2 && /^\d+$/.test(postalCode2.w!)) {
      const name = jaconv.normalize(sheet[`B${i}`].w);
      const address = jaconv.normalize(sheet[`F${i}`].w);
      const postalCode = `${postalCode1.w}-${postalCode2.w}`;

      const tell1 = sheet[`G${i}`].w;
      const tell2 = sheet[`I${i}`].w;
      const tell3 = sheet[`K${i}`].w;
      const tell = `${tell1}-${tell2}-${tell3}`;

      const capacity = Number.parseInt(sheet[`L${i}`].w);

      items.push({
        name,
        prefecture: Prefecture,
        address,
        postalCode,
        tell,
        capacity,
        source: Source,
        modifiedDate,
      });
    }
  }


  return items;
}

export async function fetchTokyoHoikujoData(url = SourceExcel) {
  const response = await fetch(url);
  const buffer = await response.buffer();
  return parseTokyoHoikujoData(buffer);
}

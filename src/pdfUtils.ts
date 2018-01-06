import * as PDFParser from "pdf2json";

interface TextData {
  T: string; // text
  S; // style index
}

interface TextBlockData {
  x: number;
  y: number;
  clr; // color index
  A; // alignment
  R: Array<TextData>;
}

// See https://github.com/modesty/pdf2json#page-object-reference for details.
interface PageData {
  Height: number;
  HLines: Array<any>;
  VLines: Array<any>;
  Fills: Array<any>;
  Texts: Array<TextBlockData>;
  Fields: Array<any>;
  Boxsets: Array<any>;
}

interface RawData {
  readonly Transcoder: string;
  readonly Agancy;
  readonly Id;
  readonly Pages: Array<PageData>;
}

export async function parsePdfToRawData(buffer: Buffer): Promise<RawData> {
  return new Promise<RawData>((resolve, reject) => {
    const pdfParser = new PDFParser();
    pdfParser.on("pdfParser_dataError", (errData) => reject(errData));
    pdfParser.on("pdfParser_dataReady", (pdfData) => resolve(pdfData.formImage));
    pdfParser.parseBuffer(buffer);
  });
}

function toRowKey(y: number) {
  return `${Math.round(y * 1)}`
}

export async function parsePdfToCsv(buffer: Buffer) {
  let rows: Array<Array<string>> = [];

  const rawData = await parsePdfToRawData(buffer);

  for (const page of rawData.Pages) {
    const rowKeys: Array<string> = [];
    const rowObjects = {};

    for (const textBlocks of page.Texts) {
      const rowKey = toRowKey(textBlocks.y);
      if (!rowObjects[rowKey]) {
        rowObjects[rowKey] = [];
      }
      const text = textBlocks.R.map((t) => decodeURIComponent(t.T)).join('');
      console.log([textBlocks.y, rowKey, text]);
      rowObjects[rowKey].push(text);

      if (!rowKeys.includes(rowKey)) {
        rowKeys.push(rowKey);
      }
    }

    rows = rows.concat(rowKeys.map((rowKey) => rowObjects[rowKey]));
  }

  return rows;
}

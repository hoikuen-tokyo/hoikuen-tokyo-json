import * as assert from "power-assert";
import * as util from "util";
import * as fs from "fs";

import { parsePdfToRawData, parsePdfToCsv } from "../src/pdfUtils";

const pdfFile = "./test/data/tokyo-minatoku-ninka-2017.pdf";

describe("pdfUtils", () => {
  const buffer = fs.readFileSync(pdfFile);

  context(".parsePdfToRawData", () => {
    it("parses PDF to raw data", async () => {
      const rawData = await parsePdfToRawData(buffer);
      assert(Array.isArray(rawData.Pages));
    });
  });

  context(".parseHoikuenPdf", () => {
    it("parses PDF to CSV-like data", async () => {
      const data = await parsePdfToCsv(buffer);
      assert(Array.isArray(data));
      console.log(data);
    });
  });
});

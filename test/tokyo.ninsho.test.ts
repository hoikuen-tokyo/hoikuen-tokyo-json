import * as assert from "power-assert";
import * as util from "util";
import * as fs from "fs";
import { parseTokyoNinshoHoikujoData } from "../src/tokyo.ninsho";

const pdfFile = "./test/data/ninsyouichiran171201.xlsx";

describe("tokyo", () => {
  const buffer = fs.readFileSync(pdfFile);

  context(".parseData", () => {
    it("parses PDF to raw data", async () => {
      const results = await parseTokyoNinshoHoikujoData(buffer);
      assert(Array.isArray(results));

      const item = results[0];
      assert(item.name);
      assert(item.address);
      assert(item.capacity);
      assert(item.kind);
      assert(item.tell);
      assert(item.source);
      assert(item.modifiedDate);
    });
  });
});

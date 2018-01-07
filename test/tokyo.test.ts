import * as assert from "power-assert";
import * as util from "util";
import * as fs from "fs";
import { parseTokyoHoikujoData } from "../src/tokyo";

const pdfFile = "./test/data/201710-2-1.xls";

describe("tokyo", () => {
  const buffer = fs.readFileSync(pdfFile);

  context(".parseData", () => {
    it("parses PDF to raw data", async () => {
      const results = await parseTokyoHoikujoData(buffer);
      assert(Array.isArray(results));

      const item = results[0];
      assert(item.name);
      assert(item.prefecture);
      assert(item.address);
      assert(item.capacity);
      assert(item.tell);
      assert(item.source);
      assert(item.modifiedDate);
    });
  });
});

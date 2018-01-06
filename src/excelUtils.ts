import * as xlsx from 'xlsx';

const LocalTimezoneOffset = new Date().getTimezoneOffset() /* hours */;

// cf. https://github.com/SheetJS/js-xlsx/wiki/Helper-functions-to-parse-tables-in-sheets
export function dateFromExcelDate(excelDate: number, timezoneOffset = LocalTimezoneOffset): Date {
  return new Date((excelDate - 25569) * (86400 * 1000) + (timezoneOffset * 60 * 1000));
}

export function timeStrFromExcelDate(excelDate: number, timezoneOffset = LocalTimezoneOffset): string {
  const date = dateFromExcelDate(excelDate, timezoneOffset);
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

export function getMaxColRow(sheet: xlsx.WorkSheet) {
  let maxCol = "A";
  let maxRow = 1;

  for (const key of Object.keys(sheet)) {
    const matched = /^([A-Z]+)([0-9]+)$/.exec(key);
    if (matched) {
      const col = matched[1];
      if (col.localeCompare(maxCol) > 0) {
        maxCol = col;
      }

      const row = Number.parseInt(matched[2]);
      if (row > maxRow) {
        maxRow = row;
      }
    }
  }

  return { maxCol, maxRow };
}

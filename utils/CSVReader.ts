import * as ExcelJS from 'exceljs';
import * as path from 'path';


export class CSVReader {
    private workbook: ExcelJS.Workbook;

    constructor(private path: string) {
        this.workbook = new ExcelJS.Workbook();
    }

    async readCSV() {
        await this.workbook.csv.readFile(this.path);
    }

    async writeCSV(sheetname: string, actualCellValue: any, updatedCellValue: any, updatedFileName: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const worksheet: any = this.workbook.getWorksheet(sheetname);
            let output = { row: -1, column: -1 };
    
            worksheet.eachRow((row: any, rowNumber: number) => {
                row.eachCell((cell: any, columnNumber: number) => {
                    if (cell.value === actualCellValue) {
                        output.row = rowNumber;
                        output.column = columnNumber;
                        console.log(output.row, output.column);
                    }
                });
            });
    
            if (output.row !== -1 && output.column !== -1) {
                const cell = worksheet.getCell(output.row, output.column);
                cell.value = updatedCellValue;
            } else {
                reject(new Error("Cell not found."));
                return;
            }
    
            const tempPath = path.join(process.cwd(), 'temp', updatedFileName);
            this.workbook.csv.writeFile(tempPath)
                .then(() => {
                    resolve();
                })
                .catch((error: Error) => {
                    reject(error);
                });
        });
    }

    async findAndReplaceCellValue(sheetname: string, row: number, column: number, newValue: any, updatedFileName: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const worksheet: any = this.workbook.getWorksheet(sheetname);
    
            const cell = worksheet.getCell(row, column);
            if (!cell) {
                reject(new Error(`Cell (${row}, ${column}) not found in sheet '${sheetname}'.`));
                return;
            }
    
            cell.value = newValue;
    
            const tempPath = path.join(process.cwd(), 'temp', updatedFileName);
            this.workbook.csv.writeFile(tempPath)
                .then(() => {
                    resolve();
                })
                .catch((error: Error) => {
                    reject(error);
                });
        });
    }

    async getTotalRows(sheetname: string): Promise<number> {
        return new Promise((resolve, reject) => {
            const worksheet: any = this.workbook.getWorksheet(sheetname);
    
            if (!worksheet) {
                reject(new Error(`Worksheet '${sheetname}' not found.`));
                return;
            }
            const rowCount = worksheet.rowCount;
            resolve(rowCount);
        });
    }

    async getTotalColumns(sheetname: string): Promise<number> {
        return new Promise((resolve, reject) => {
            const worksheet: any = this.workbook.getWorksheet(sheetname);
    
            if (!worksheet) {
                reject(new Error(`Worksheet '${sheetname}' not found.`));
                return;
            }
            const columnCount = worksheet.columnCount;
            resolve(columnCount);
        });
    }
    

}

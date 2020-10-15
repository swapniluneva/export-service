/**
 * Generate Excel files with rich features like Style, Validation, Branding, Formulae etc.
 * References:
 * https://www.npmjs.com/package/excel4node
 * https://github.com/natergj/excel4node
 */

const excelNode = require('excel4node');
const path = require('path');
const fs = require('fs');

export class ExcelUtil {

    private filePath: string = '';
    private workBookInstance: any;
    private workSheetInstance: any;
    private rowNumber: number = 1;
    private headers: any = [];

    constructor(filePath: string, headers: any) {
        this.headers = headers;
        this.initWorkbook(filePath);
    }

    private initWorkbook(filePath: any) {
        this.workBookInstance = new excelNode.Workbook();
        this.filePath = filePath;
    }

    loadSheet() {
        this.workSheetInstance = this.workBookInstance.addWorksheet('Sheet');
        this.rowNumber = 1;
        this.addRow(this.headers);
    }

    //----- Auto load new sheets w.r.t MAX_ROWS
    private addValue(col:number, value: any) {
        let cell = this.workSheetInstance.cell(this.rowNumber, col);
        if(typeof value === 'number') {
            cell.number(value);
        } else {
            cell.string(value || '');
        }
            
    }

    addRow(row: any) {
        if(Array.isArray(row)) {
            for(let i = 0; i < row.length; i++) {
                this.addValue(i+1, row[i]);
            }
            this.rowNumber++;
        }
    }

    async sendFile(res: any) {
        this.workBookInstance.write(this.filePath, res);
    }
}
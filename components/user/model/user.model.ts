import sql from 'mssql'
import { Container } from 'typedi';
import { ExcelUtil } from '../../../helpers/utils/excel.util';
export class UserModel {
    
    public sqlConnection: any;

    constructor() {
        this.sqlConnection = Container.get('sqlConnection');
    }
    
    public async ExportUsers(res: any) {
        let jobStarted = false;
        let xl: any;
        const sqlConnectionRequest = await this.sqlConnection.request();
        sqlConnectionRequest.stream = true;
        const MAX_ROWS_THRESHOLD = 100;
        let rowsToProcess: any = [];

        let filesArray = [];

        // Function call handle for each row received from DB stream
        function processRows() {
            // process rows
            if(!jobStarted) {
                jobStarted = true;
               xl = new ExcelUtil(`Users.xlsx`, Object.keys(rowsToProcess[0]));
               xl.loadSheet();
            }

            for(let i = 0; i < rowsToProcess.length; i++) {
                xl.addRow(Object.values(rowsToProcess[i]));
            }
            rowsToProcess = [];
        }

        sqlConnectionRequest.on('row', async (row: any) => {
            // Emitted for each row in a recordset
            rowsToProcess.push(row);
            if (rowsToProcess.length >= MAX_ROWS_THRESHOLD) {
                sqlConnectionRequest.pause();
                processRows();
                sqlConnectionRequest.resume();
            }
        });
    
        sqlConnectionRequest.on('error', async (err: any) => {
            // May be emitted multiple times
            console.log('row', err);
            throw err;
        });
    
        // Final call 
        sqlConnectionRequest.on('done', async (result: any) => {
            // Always emitted as the last one
            try {
                processRows();
                xl.sendFile(res);
            } catch (err) {
                throw err;
            }
        });

        sqlConnectionRequest
        .query("SELECT id,name,gmail,gender,status,created_at,updated_at FROM sm_users ORDER BY user_key");
    }
}

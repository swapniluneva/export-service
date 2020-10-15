import mssqlInstance = require("mssql");
import config from '../../config';
// const config = {
//     server: "WIN-8J10L3FDQFT\\SQL2016",
//     user: "sa",
//     password: "asd@123",
//     database: "BrookField",
// };
export default async (): Promise<any> => {
    try {
        var dbConfig: any= config.sql;
        const pool: mssqlInstance.ConnectionPool = await new mssqlInstance.ConnectionPool(dbConfig);
        const poolConnect = await pool.connect();
        console.log("DB Connected successfully");
        return poolConnect;
    }
    catch (err) {
        console.log(err);
        throw ({ type: "db error", message: "error while conneting the db" });
    }
};


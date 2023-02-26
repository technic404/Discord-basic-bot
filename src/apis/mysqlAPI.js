const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'some_bot_database',
    charset: 'utf8mb4'
});

async function countRows(tableName, restStatement) {
    const sql = "SELECT COUNT(*) AS rowCount FROM `" + tableName + "` " + restStatement;

    const res = await new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err) {
                reject(err);
                return;
            } else {
                resolve(result);
            }
        })
    });

    return (parseInt(res[0].rowCount));
}

async function getQuery(statement) {
    const sql = statement;

    const res = await new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err) {
                reject(err);
                return;
            } else {
                resolve(result);
            }
        })
    });

    return res;
}

function executeUpdate(statement) {
    connection.query(statement, (err, result) => { });
}

module.exports = {
    countRows,
    getQuery,
    executeUpdate,
    connection: connection
}
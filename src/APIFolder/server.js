const sql = require('mssql');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors()); // Use the cors middleware to allow all origins

//const port = process.env.PORT || 1434;
const port = process.env.PORT || 32167;


const config2 = {
    server: 'PINEAPPLE_EM',
    database: 'EM_DB',
    driver: 'tedious',
    pool: {
        min: 5,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustedConnection: true,
        instanceName: 'SQLEXPRESS'
    }
};
const dbConfig =config1

app.use(express.json());

app.post('/api/createOrUpdateEvent', async (req, res) => {
    const { eventId, eventName, description, startDate, endDate, timezone } = req.body;
    try {
        const pool = await new sql.ConnectionPool(dbConfig).connect();
        const result = await pool.request()
            .input('EventId', sql.NVarChar(50), eventId || null)
            .input('EventName', sql.NVarChar(50), eventName)
            .input('EventDesc', sql.NVarChar(sql.MAX), description)
            .input('StartDate', sql.NVarChar(50), startDate)
            .input('EndDate', sql.NVarChar(50), endDate)
            .input('TimeZone', sql.NVarChar(50), timezone)
            .execute('EM_CreateUpdateEvent');

        await pool.close();
        res.json(result.recordsets[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/deleteEvent', async (req, res) => {
    const { eventId } = req.body;
    try {
        const pool = await new sql.ConnectionPool(dbConfig).connect();
        const result = await pool.request()
            .input('EventId', eventId || null)
            .execute('EM_DeleteEvent');

        await pool.close();
        res.json(result.recordsets[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/fetchAllEvent', async (req, res) => {
    try {
        const pool = await new sql.ConnectionPool(dbConfig).connect();
        const result = await pool.request().execute('EM_FetchAllEvents');

        await pool.close();
        res.json(result.recordsets[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
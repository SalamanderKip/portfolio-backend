const express = require('express')
const app = express()
const db = require('./config')
app.get('/projects', function (req, res) {
    db.connection.connect();

    db.connection.query('SELECT * FROM projecten', function (error, results, fields) {
        if (error) throw error;
        var data = JSON.stringify(results)
        console.log(data);
        return res.send(data)
    });

    db.connection.end();
})

app.listen(3001)
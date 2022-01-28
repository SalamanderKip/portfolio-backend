const express = require('express')
const app = express()
const db = require('./config')
db.connection.connect();

app.get('/projects', function (req, res) {
    db.connection.query("SELECT * FROM projecten",(error,result,fields)=>{
        console.log(result)
        res.send(result).status(200)
    })
})

// app.get("/test", (res,req)=> {
//   db.connection.query("SELECT * FROM projecten",(error,result,fields)=>{
//       console.log(result)
//       req.send(result).status(200)
//   })
// })
app.listen(3001)
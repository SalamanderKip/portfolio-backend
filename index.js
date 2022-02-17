const express = require('express');
const router = express.Router();
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();
const db = require('./config');
// db.connection.connect();

app.use(cors());
app.use(express.json());
app.use('/', router);

const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'email',
        pass: 'wachtwoord', 
    },
});

contactEmail.verify((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Ready to send');
    }
});

router.post('/contact', (req, res) => {
    const firstname = req.body.voornaam;
    const lastname = req.body.achternaam;
    const email = req.body.email;
    const message = req.body.bericht;
    const mail = {
        from: email,
        to: 'bosmaarteninfo@gmail.com',
        subject: `Contact Form Submission: ${email}`,
        html: `<p>Naam: ${firstname} ${lastname}</p>
            <p>E-mail: ${email}</p>
            <p>Bericht: ${message}</p>`
    };

    contactEmail.sendMail(mail, (error) => {
        if (error) {
            res.json({ status: 'ERROR'});
        } else {
            res.json({ status: 'Message Sent'});
        }
    })
});

// app.get('/api/projects', function (req, res) {
//     let params = [];

//     let query = "SELECT * FROM projecten";
//     let language = req.query.language;
//     if (language) {
//         query += " where language=?";
//         params.push(language);
//     }

//     db.connection.query(query, params, (error, result, fields) => {
//         console.log(result)
//         res.send(result).status(200)
//     })
// });
app.listen(3001);
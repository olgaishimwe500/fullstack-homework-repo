const port = process.env.PORT || 5001;
const express = require('express');
const path = require('path');
const app = express();
// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered

app.use(express.urlencoded({extended: false}));

const escapeHtml = (text) =>
    String (text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
app.get('/', (req, res) =>{
    res.status(200);
    res.set({'Content-Type': 'text/html'});
    res.send('<h1>Form</h1><a href="/form"> Got to the form</a>');
});

app.get('/form', (req, res) =>{
    res.sendFile(path.join(__dirname, 'form.html'));
});

app.post('/submit', (req, res) => {
    const {username, email, comments} = req.body;
    const newsletter = req.body.newsletter ? 'Yes, sign me up' : 'no thank you';

    res.status(200);
    res.set({'Content-Type': 'text/html'});
    res.send(`
        <h1> Thank you for submitting!</h1>
        <p><strong>Username:</strong> ${escapeHtml(username || '')}</p>
        <p><strong>Email:</strong> ${escapeHtml(email || '')}</p>
        <p><strong>Comments:</strong> ${escapeHtml(comments || 'n/a')}</p>
        <p><strong>Newsletter:</strong> ${newsletter}</p>
        <a href="/form">Back to the form</a>
        `);
});
app.listen(port, () =>{
    console.log(`Server running http://localhost:${port}`);
});


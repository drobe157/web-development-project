const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const ejs = require('ejs');

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static(path.join(__dirname, 'public'))); // set public folder as base directory for stylesheets and pictures

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/HomePage.html'); // send HomePage on base GET request
});

app.get('/HomePage.html', (req, res) => {
    res.sendFile(__dirname + '/HomePage.html'); // send HomePage on HomePage GET request
});

app.get('/ContactPage.html', (req, res) => {
    res.sendFile(__dirname + '/ContactPage.html'); // send ContactPage on ContactPage GET request
});

app.get('/AboutPage.html', (req, res) => {
    res.sendFile(__dirname + '/AboutPage.html'); // send AboutPage on AboutPage GET request
});

app.post('/submit-form', (req, res) => {
    const username = req.body.name; // access form data
    const email = req.body.email;
    if (username == "" || email == "") {
        //     res.send("Please enter both a username and email"); // if username or email empty 
        res.render('SubmissionPage', { header: 'Error!', message: 'Please enter a valid username and email' });
    } else if (!isEmailValid(email)) {
        //res.send(`The email address ${email} is not a valid email, please enter a valid email address`); // if email doesn't validate
        res.render('SubmissionPage', { header: 'Error!', message: `The email address ${email} is not a valid email, please enter a valid email address` });
    } else {
        //es.send(`Thank you for contacting us, ${username}! We will get back you at ${email}`); // if username and email are valid this is successful
        res.render('SubmissionPage', { header: 'Submission Complete!', message: `Thank you for contacting us, ${username}! We will get back you at ${email}` });
    }

    
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

const emailRegex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/


function isEmailValid(email) {
    // Check if the email is defined and not too long
    if (!email || email.length > 254) return false;

    // Use a single regex check for the standard email parts
    if (!emailRegex.test(email)) return false;

    // Split once and perform length checks on the parts
    const parts = email.split("@");
    if (parts[0].length > 64) return false;

    // Perform length checks on domain parts
    const domainParts = parts[1].split(".");
    if (domainParts.some(part => part.length > 63)) return false;

    // If all checks pass, the email is valid
    return true;
}
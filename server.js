const express = require('express');
const bodyParser= require('body-parser');
const app = express();
app.use(bodyParser());
app.set('view engine', 'ejs')
const MongoClient = require('mongodb').MongoClient;

var db;
MongoClient.connect('mongodb://user1:password1@ds123753.mlab.com:23753/flashcards', (err, client) => {
    if (err) return console.log(err);
    db = client.db('flashcards'); // database name
    app.listen(3000, () => {
        console.log('listening on 3000')
    })
});
//The urlencoded method within body-parser tells body-parser to extract data from the <form> element
//and add them to the body property in the request object

app.post('/flashcards', (req, res) => {
    db.collection('flashcards').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('saved to database')
        res.redirect('/')
    })
});

app.get('/', (req, res) => {
    db.collection('flashcards').find().toArray(function(err, result) {
        if (err) return console.log(err);
        // renders index.ejs
        res.render('/Users/kseniaklamut/WebstormProjects/CRUD list app/views/index.ejs', {quotes: result})
    });
});
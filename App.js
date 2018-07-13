const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/articles');
let db = mongoose.connection;

//Check connection
db.once('open',()=>{
    console.log('Connected to MongoDB');
});

//chech for db errors
db.on('error',(err)=>{
    console.log(err);
});
//Init app
const app =  express();
//Load view Engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine','pug');
//Home Route
app.get('/', (req,res)=>{
    //res.send('hello world');//send something to the browser
    //array harcoded for working pug
    /*let articles = [
        {4
            id: 1,
            title: 'Article one',
            author: 'Brad Traversy',
            body: 'This is article one'
        },
        {
            id: 2,
            title: 'Article two',
            author: 'Joe Doe',
            body: 'This is article two'
        },
        {
            id: 3,
            title: 'Article three',
            author: 'Jhon Doe',
            body: 'This is article three'
        },
    ]*/

    res.render('index', {
        title:'Articles',
        articles: articles
    });//render index
});

//Add route
app.get('/articles/add', (req,res)=> {
    res.render('add_articles',{
        title:'Add article'
    });
});

//Start server
app.listen(3000,()=>{
    console.log('server started on port 3000...');//escucha el puerto.
});
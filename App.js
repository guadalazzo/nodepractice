const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/articles');
let db = mongoose.connection;

//Check connection
db.once('open',()=>{
    console.log('Connected to MongoDB...');
});

//chech for db errors
db.on('error',(err)=>{
    console.log(err);
});
//Init app
const app =  express();
//Bring in Modes
let Article =  require('./models/article');
//Load view Engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine','pug');

//Body Parser Middleware
//parse application'
app.use(bodyParser.urlencoded({extended:false}));
//parse app json
app.use(bodyParser.json());
//Set Public Folder
app.use(express.static(path.join(__dirname,'public')));
//Home Route
app.get('/', (req,res)=>{
    //res.send('hello world');//send something to the browser
    Article.find({}, (err,articles)=>{
        if(err){
            console.log(err);
        }else {
            res.render('index', {
                title: 'Articles',
                articles: articles
            });//render index
        }
    });
});
app.get('/article/:id',(req,res)=>{
    Article.findById(req.params.id, (err, article)=>{
        res.render('article',{
            article:article
        });
    });
});
//Add route
app.get('/articles/add', (req,res)=> {
    res.render('add_articles',{
        title:'Add article'
    });
});
//Add Submit post route
app.post('/articles/add', (req,res)=> {
        let article = new Article();
        article.title = req.body.title;
        article.author = req.body.author;
        article.body = req.body.body;

        article.save((err)=>{
            if(err){
                console.log(err);
                return;
            }else{
                res.redirect('/');
            }
        })
    }
);
//Start server
app.listen(3000,()=>{
    console.log('server started on port 3000...');//escucha el puerto.
});
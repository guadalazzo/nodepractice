const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/articles', { useNewUrlParser: true });
let db = mongoose.connection;

//Check connection from data base
db.once('open',()=>{
    console.log('Connected to MongoDB...');
});

//chech for db errors
db.on('error',(err)=>{
    console.log(err);
});
//Init app with express
const app =  express();
//Bring in Models from article
let Article =  require('./models/article');
//Load view Engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine','pug');

//Body Parser Middleware
//parse application'
app.use(bodyParser.urlencoded({extended:false}));
//parse app json
app.use(bodyParser.json());
//Set Public Folder where you could find the bowecomponents
app.use(express.static(path.join(__dirname,'public')));
//Home Route get request and response.
app.get('/', (req,res)=>{
    //res.send('hello world');//send something to the browser
    Article.find({}, (err,articles)=>{
        if(err){//check for errors
            console.log(err);
        }else {
            res.render('index', {
                title: 'Articles',
                articles: articles
            });//render index
        }
    });
});
//Route from an article
app.get('/article/:id',(req,res)=>{ //id is a variable
    Article.findById(req.params.id, (err, article)=>{ //we can access to them by calling req.params
        res.render('article',{
            article:article
        });
    });
});
//Add Articles route  GET
app.get('/articles/add', (req,res)=> {
    res.render('add_articles',{
        title:'Add article'
    });
});
//Add Articles Submit POST route
app.post('/articles/add', (req,res)=> {
        let article = new Article(); //New object typeof Article (defined previously in models)
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
        });
    }
);
//Load Edit form
app.get('/article/edit/:id',(req,res)=>{ //id is a variable
    Article.findById(req.params.id, (err, article)=>{ //we can access to them by calling req.params
        res.render('edit_article',{
            title:  'Edit Article',
            article:article
        });
    });
});
//Update Submit, Edit form from article
app.post('/articles/edit/:id', (req,res)=> {
        let article =  {} //New object typeof Article (defined previously in models)
        article.title = req.body.title;
        article.author = req.body.author;
        article.body = req.body.body;
        let query = {_id:req.params.id}
        Article.update(query, article, (err)=>{
            if(err){
                console.log(err);
                return;
            }else{
                res.redirect('/');
            }
        });
    }
);
//Delete article with ajax
app.delete('/article/:id',(req,res)=>{
    let query = {_id:req.params.id};
    Article.remove(query, (err)=>{
            if(err){
                console.log(err);
            }else {
                res.send('Succes');
            }
        });
});
//Start server
app.listen(3000,()=>{
    console.log('server started on port 3000...');//escucha el puerto.
});
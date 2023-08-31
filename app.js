const express = require('express');
const mongoose = require('mongoose');

const expressLayouts = require('express-ejs-layouts');

const app = express();
//db config
//const db = require('./config/keys').MongoURI;

//connect to mongo
mongoose.connect('mongodb://localhost:27017/passport',
{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
    .then(()=>console.log("Connected"))
    .catch(err => console.log(err));

//ejs
app.use(expressLayouts);
app.set('view engine','ejs');


//body  parser

app.use(express.urlencoded({extended:true}));



//Routes
app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))


const PORT = process.env.PORT || 5000 ;

app.listen(PORT,console.log(`Server started on ${PORT}`));
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express =require('express');
const methodOverride = require('method-override');
const app = express();
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');
const drugRouter = require('./routes/drug')
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout','layouts/layout');
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true,useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to mongo....')
});
app.use(expressLayouts)
app.use('/',indexRouter)
app.use('/drugs',drugRouter)
app.listen(process.env.PORT || 3000,()=>{
    console.log('connected...')
});
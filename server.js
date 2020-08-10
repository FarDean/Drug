const express =require('express');
const app = express();
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index')
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout','layouts/layout');
app.use(express.static('public'));

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true,useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to mongo....')
});
app.use(expressLayouts)
app.use('/',indexRouter)

app.listen(process.env.PORT || 3000,()=>{
    console.log('connected...')
});
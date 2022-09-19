const express = require('express'); //llamamos a Express
const app = express();
const morgan=require('morgan');
const router=require('./routes');
const config=require('../config');

//Configurations
app.set('json spaces', 2);

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Router
app.use('/api', router);

//Start Server
app.listen(config.PORT,()=>{
  console.log(`Server listening on port ${config.PORT}`);
});

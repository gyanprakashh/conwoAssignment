const app=require('express')();
const morgan=require('morgan');
const cors=require('cors');
const bodyParser=require('body-parser');
const allroutes=require('./routes/routesf');
require('dotenv').config();
const { NODE_PORT, NODE_ENV } = process.env;
const development = NODE_ENV === "development";

if (development) {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  app.options("*", cors());
app.use('/api',allroutes)

  app.listen(NODE_PORT, () => {
    console.log(`server is running on ${process.env.NODE_PORT}`);
  });
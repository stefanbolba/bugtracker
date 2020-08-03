const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

//Add this variable here since there are problems with setting the heroku config file for it
const database =
  'mongodb+srv://stefan:<PASSWORD>@cluster0.11tei.mongodb.net/bugtraker?retryWrites=true&w=majority';
const DB = database.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

//CONNECT TO THE DATABASE
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('Database connection succesfull!');
  });

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Running on port: ${port} ...`);
});

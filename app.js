const morgan = require('morgan')
const express = require('express')
const app = express()
const path = require('path')
const { db } = require('./models/index')

app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: false }));

const init = async () => {
  try {
    await db.sync();
    await db.authenticate().then( () => {
      console.log('connected to the database');
    })
  } catch (err){
    console.error(err)
  }

  const PORT = 1444;
  app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}.`);
  });
}

init()

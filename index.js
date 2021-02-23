const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://YoojinHwang:elwufk12@thefirstyoojindb.edswc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log('MONGO GOOD');
  })
  .catch((err) => {
    console.log(`MONGO BAD : ${err}`);
  });

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => {
  console.log(`${port} 잘 돌아가고 있음`);
});

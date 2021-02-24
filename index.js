const express = require('express');
const app = express();
const port = 5000;
const bodyparser = require('body-parser');
const { User } = require('./models/User');

// application /x-www-form-urlencoded 이렇게 생긴 데이터를 가져올수 있게 하는 것
app.use(bodyparser.urlencoded({ extended: true }));
// application / json 타입의 데이터를 가져올 수 있게 하는 것
app.use(bodyparser.json());

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

// 39~45 회원가입을 위한 route
app.post('/register', (req, res) => {
  // 회원가입할 때 필요한 정보들을 client에서 받아오면
  // 정보를 데이터베이스에 넣는다

  const user = new User(req.body);
  // save는 몽고db에서 오는 method
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`${port} 잘 돌아가고 있음`);
});

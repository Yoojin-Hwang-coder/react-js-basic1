const express = require('express');
const app = express();
const port = 5000;
const bodyparser = require('body-parser');
const { User } = require('./models/User');
const config = require('./config/key');
const cookieParser = require('cookie-parser');

// application /x-www-form-urlencoded 이렇게 생긴 데이터를 가져올수 있게 하는 것
app.use(bodyparser.urlencoded({ extended: true }));
// application / json 타입의 데이터를 가져올 수 있게 하는 것
app.use(bodyparser.json());
// cookieParser 사용할 수 있게 해주는 것
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
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

// 로그인을 위한 route
app.post('/login', (req, res) => {
  // 요청된 이메일을 db에서 찾기
  User.findOne({ email: req.body.email }, (err, userInfo) => {
    if (!userInfo) {
      return res.json({
        loginSuccess: false,
        message: '등록된 이메일이 없습니다.',
      });

      // else = email이 있다면 요청된 이메일이 db에 있다면 비밀번호 확인
    } else {
      userInfo.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res.json({
            loginSuccess: false,
            message: '비밀번호가 맞지 않습니다.',
          });
        } // 비밀번호가 맞다면 토큰 생성하기
        else {
          userInfo.makeToken((err, userInfo) => {
            if (err) {
              return res.status(400).send(err);
            } else {
              // 토큰을 저장해야하는데 어디에 저장할지 정하기
              // (쿠키 or 로컬스토리지)
              // 이번에는 쿠키에 저장
              res.cookie('x-auth', userInfo.token).status(200).json({
                loginSuccess: true,
                userId: userInfo._id,
              });
            }
          });
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`${port} 잘 돌아가고 있음`);
});

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRound = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    // trim: true는 email id 중간의 공백을 매워주는 역할
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 8,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// 비밀번호를 암초화시키는 mothod
userSchema.pre('save', function (next) {
  let user = this;
  // 비밀번호를 암호화시킨다
  if (user.isModified('password')) {
    bcrypt.genSalt(saltRound, function (err, salt) {
      if (err) {
        return next(err);
      } else {
        bcrypt.hash(user.password, salt, function (err, hash) {
          if (err) {
            return next(err);
          } else {
            user.password = hash;
            next();
          }
        });
      }
    });
  } else {
    next();
  }
});

// 비밀번호 체크하는 method
userSchema.methods.comparePassword = function (plainPassword, cb) {
  //plainPassword 1234567    암호회된 비밀번호 $2b$10$l492vQ0M4s9YUBfwYkkaZOgWHExahjWC
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// 토큰을 생성하는 mothod
userSchema.methods.makeToken = function (cb) {
  let user = this;
  // jwt를 이용해 token생성하기
  let token = jwt.sign(user._id.toHexString(), 'secretToken');

  user.token = token;
  user.save(function (err, user) {
    if (err) {
      return cb(err);
    } else {
      cb(null, user);
    }
  });
};
const User = mongoose.model('User', userSchema);

module.exports = { User };

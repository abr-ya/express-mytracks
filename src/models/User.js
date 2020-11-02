const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({ 
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	picture: String,
});

// hashing user password
// not arrow for simple use of this
userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// проверка введенного пароля
userSchema.methods.comparePassword = function(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMath) => {
      if (err) return reject(err);
      if (!isMath) return reject(false);
      return resolve(true);
    });
  });
}

mongoose.model('User', userSchema);

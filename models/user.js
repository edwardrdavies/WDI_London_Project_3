const mongoose  = require('mongoose');
const bcrypt    = require('bcrypt');
const validator = require('validator');
const uuid = require('uuid');


const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true },
  profileImage: { type: String },
  locked: { type: Boolean, default: true },
  confirmationCode: { type: String, default: uuid.v1 },
  facebookId: { type: String},
  twitterId: { type: String },
  githubId: { type: String },
  instagramId: { type: String },
  passwordHash: { type: String },
  lineFavs: [ String ]
});

function setPassword(value){
  this._password = value;
}

function setPasswordConfirmation(passwordConfirmation) {
  this._passwordConfirmation = passwordConfirmation;
}

function validateEmail(email) {
  if (!validator.isEmail(email)) {
    return this.invalidate('email', 'must be a valid email address');
  }
}

function validatePassword(password){
  return bcrypt.compareSync(password, this.passwordHash);
}

userSchema
  .virtual('password')
  .set(setPassword);

userSchema
  .virtual('passwordConfirmation')
  .set(setPasswordConfirmation);

userSchema
  .path('email')
  .validate(validateEmail);

userSchema.methods.validatePassword = validatePassword;

userSchema.set('toJSON', {
  transform: function(doc, json) {
    delete json.passwordHash;
    delete json.confirmationCode;
    delete json.__v;
    return json;
  }
});

function preValidate(next) {
  if (this.isNew) {
    if (!this._password && !this.facebookId && !this.twitterId && !this.instagramId) {
      this.invalidate('password', 'A password is required.');
    }
  }

  if(this._password) {
    if (this._password.length < 6) {
      this.invalidate('password', 'must be at least 6 characters.');
    }

    if (this._password !== this._passwordConfirmation) {
      this.invalidate('passwordConfirmation', 'Passwords do not match.');
    }
  }
  next();
}

userSchema.pre('validate', preValidate);

function preSave(next) {
  if(this._password) {
    this.passwordHash = bcrypt.hashSync(this._password, bcrypt.genSaltSync(8));
  }

  next();
}

userSchema.pre('save', preSave);

module.exports = mongoose.model('User', userSchema);

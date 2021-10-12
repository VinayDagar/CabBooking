/* eslint-disable no-undef */
const fields = require('./fields');

const beforeSave = require('./hooks/before-save');

const UserModel = new MongooseSchema(fields, {
  timestamps: true,
});

UserModel.pre('save', beforeSave);

// Defining class methods for user model.
Object.assign(UserModel.statics, requireDirectory(module, 'class-methods'));

module.exports = MongooseConnect.model('User', UserModel);

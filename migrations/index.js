// eslint-disable-next-line no-unused-vars
require('../configurations/dependency-include');

const userMigration = require('./1634034705319-add_users');
const cabMigration = require('./1634035001729-add_cabs');

userMigration.up();
cabMigration.up();

process.exit(0);

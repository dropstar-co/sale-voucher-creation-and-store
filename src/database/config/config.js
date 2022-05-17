require('dotenv').config();

const dbConfig = {
  development: {
    use_env_variable: 'TEST_URL',
    dialect: 'postgres',
    dialectOptions: {},
  },
  test: {
    use_env_variable: 'TEST_URL',
    dialect: 'postgres',
    dialectOptions: {},
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    operatorsAliases: false,
  },
};

module.exports = dbConfig;

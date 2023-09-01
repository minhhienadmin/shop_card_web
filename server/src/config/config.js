require('dotenv').config(); // this is important!

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME || "postgres",
    "password": process.env.DB_PASSWORD || "X!6c*5FZ#y*_Ubf",
    "database": process.env.DB_DATABASE_NAME || "postgres",
    "host": process.env.DB_HOST || "db.ectlhxpnsbgrmadnppvy.supabase.co",
    "port": process.env.DB_PORT || 5432,
    "dialect": process.env.DB_DIALECT || 'postgres',
    logging: console.log,
    "define": {
      "freezeTableName": true
    },
    dialectOptions:
      process.env.DB_SSL === 'true' ?
        {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        } : {}
    ,
    "timezone": "+07:00"
  }
};
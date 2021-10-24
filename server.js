const express = require('express');
require("dotenv").config();
// create express app
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const { logger } = require('./logger/logger');
const passport = require('passport');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
app.use(require('cookie-parser')());

// parse requests of content-type - application/json
app.use(express.json())

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to FundooNotes application."});
});

require('./app/utilities/auth');
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//Configuring the database
const dbConfig = require('./config/database.config.js');
dbConfig.connection();

require('./app/routes/user.routes.js')(app);

// listen for requests
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port : ${process.env.PORT}`);
    logger.info(`Server is listening on port : ${process.env.PORT}`);
});

module.exports = app;
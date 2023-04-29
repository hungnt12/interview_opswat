'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express()
const expressSwagger = require('express-swagger-generator')(app);
const options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample BE server',
            title: 'Swagger',
            version: '1.0.0',
        },
        // host: 'localhost:3000',
        // basePath: '/v1',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./controllers/*.js'] //Path to the API handle folder
};

expressSwagger(options);
app.use(cors({
    origin: `*`
}));
app.use(bodyParser.json())
app.disable('x-powered-by')

app.use('/api/', [
    require('./routes/auth-routes'),
    require('./routes/user-routes'),
    require('./routes/article-routes')
])

app.use(require('./middleware/error-middleware').all)

module.exports = app

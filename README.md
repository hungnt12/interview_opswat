# Nguyen Thanh Hung - Code Challenges [BACKEND]

The project includes
- Backend source: Show restful api
- Frontend source: Show Ui for customer

## Config database for run

["./knexfile.js"](""")

`connection: {
    host: '{IP or localhost}',
    port: 3306,
    user: '{user database connect}',
    password: '{password database connect}',
    database: '{table name}'
},
`

## Command Setup

### `npm install`
### `npm run db:migrate`

The command used to run create the database's table

### `npm run db:seed`

The command used to create data for the project

### `npm start`

Run for project

API Docs: [Swagger](http://localhost:3111/api-docs/)

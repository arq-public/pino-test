const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const path= require('path')

const basePath= path.join(__dirname)
const appPath = path.join(basePath,'dist','app.js')
console.log(appPath)
const userApp = require(appPath)
console.log(userApp)

app.use('/',
userApp({
    server,app
})
)
server.listen(4000,()=>{
    console.log(`App started on port 4000`)
})
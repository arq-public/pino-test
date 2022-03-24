const express = require('express');
const app = express();
const parent = require('./logger')
const logger = parent.child({module:"app.js"})
const path = require('path')

app.get('/', (req, res) => {
    const ob={name:"Obi-Wan Kenobi",mpin:56,age:23,pin:1234}
    logger.info(ob)
    console.log('new?')
    //logger.debug('My debug message')
    //logger.error('My error message')
    console.log('Sending response ')
    res.send('Hello World!');
    //logger.log({showDetails:true, message: 'Outgoing Response Headers', level: 'info', 'contentLength': `(${4+67} bytes sent)` });
});

// app.listen(4000, () => {
//     console.log('Example app listening on port 4000!');
//     console.log(`And i'm running in ${path.resolve('app2.js')}`)
// });

module.exports = ()=>app;

//Run app, then load http://localhost:port in a browser to see the output.
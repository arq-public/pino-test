const pino = require('pino')
// const transport = pino.transport({
//     target:process.stdout
// })

// const asyncStdoutDestination = pino.destination({
//         minLength:4096,
//         sync:false
// })



const redact = {
        paths:['pin','mpin','motherName'],
        censor: '***'
}

// const stdoutTransport = pino.transport({
//         pipeline: [{
//                 target:'./transform.mjs'
//         },{
//                 target:'pino/file',
//                 options: {destination:1}
//         }
// ]
// })


// const transformedTransport = pino.transport({
//         pipeline: [{
//                 target:'./transform.mjs'
//         },        
//         {target:'./file-transport.mjs',options:{destination:'knives.out'}}
// ]
// })

// const tpot = pino.transport({
        
//         targets:[
//                 { 
//                         target:transformedTransport
//                 }
//         ]
// })

const transport = pino.transport({
        // pipeline:[{
        //                 target:'./transform.mjs'
        //         },
        //         {
        //                 target:'pino/file',
        //                 options:{destination:'logs2.out'} // It seems like Async logging and Transport streams won't work together as Transport with an async transformation target function is alredy async for worker thread ( Most like the Async , defined above around line 6 is used if you aren't using worker thread and logging in main thread, i.e. you are not using Transport)
        //         },
        //         {
        //                 target:'pino/file',
        //                 options:{destination:'logs3.out'}
        //         }
                
        // ]
        // ,
        pipeline:[
                
                        {target:'./transform-temp.js'},
                        {target:'./echo-temp.js'},
                        //{target:'./file-stream.mjs',options:{destination:'knives2.out'}}
                        {target:'pino/file',options:{destination:'knives3.out'}},
                         
                
                ]
                        
                // },
                // { 
                // target:'pino/file',
                // options: {destination:1} 
                // }
        
})




const logger = pino({level:'debug',redact:redact,timestamp:false},transport)
setInterval(function () {
        logger.flush()
}, 10000).unref()

logger.log = msgObject=>{
        const level = msgObject.level || 'info' 
        if(level=='info')
                this.info(msgObject)
        else
                this.debug(msgObject)
}

module.exports = logger;
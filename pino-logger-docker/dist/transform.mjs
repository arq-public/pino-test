import build from 'pino-abstract-transport'
import { pipeline, Transform } from 'stream'
import bfj from 'bfj'
import {EOL} from 'os'


const levels = { 10: 'trace',20: 'debug',30: 'info',40: 'warn',50: 'error',60: 'fatal' }

const changeLabel=(chunk)=>{chunk.level=levels[chunk.level]}
const getNowFormatPKTZ = ()=>{
  const now = new Date();
  const en = now.toLocaleString('en-GB',{timeZone: 'Asia/Karachi'});
  return en + ' ' + now.getMilliseconds() + ' ms'
}


export default async function (options) {
  return build(function (source) {
    const myTransportStream = new Transform({
      // Make sue autoDestroy is set,
      // this is needed in Node v12 or when using the
      // readable-stream module.
      autoDestroy: true,

      objectMode: true,
      transform (chunk, enc, cb) {
        changeLabel(chunk)
        // modifies the payload somehow
        chunk.service = 'pino'
        chunk.broughtBy='bfj'
        chunk.localTime=getNowFormatPKTZ()
        const r = Object.assign(chunk,{context:"obiwan"})
        // stringify the payload again
        bfj.stringify(r)
        .then(j=>{
          this.push(j);
          this.push(EOL);this.push(EOL);
          cb()})
        .catch(e=>console.error(e))        
      }
    })
    pipeline(source, myTransportStream, () => {})
    return myTransportStream
  }, {
    // This is needed to be able to pipeline transports.
    enablePipelining: true
  })
}
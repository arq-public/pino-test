import build from 'pino-abstract-transport'
import { pipeline, Transform } from 'stream'
import bfj from 'bfj'
import {EOL} from 'os'


export default async function (options) {
  return build(function (source) {
    const myTransportStream = new Transform({
      // Make sue autoDestroy is set,
      // this is needed in Node v12 or when using the
      // readable-stream module.
      autoDestroy: true,

      objectMode: true,
      transform (chunk, enc, cb) {
        // stringify the payload again
        // console.log('Typeof chunk is below')
        // console.log(typeof chunk)
        //console.log(chunk.toString());

        bfj.stringify(chunk)
        .then(j=>{
          console.log(j)
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
import {once} from 'events'
export default async(options)=>{
    const stream = process.stdout
    await once(stream,'open')
    return stream
}
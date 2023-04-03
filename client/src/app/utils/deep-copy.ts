
export default function<T>(array: T[]){
    return JSON.parse(JSON.stringify(array))
}

export class LocalStorage{
    static get(key: string){
        return localStorage.getItem(key)
    }

    static set(key: string, value: string){
        return localStorage.setItem(key, value)
    }

    static remove(key: string){
        if(this.get(key)){
            localStorage.removeItem(key)
        }
    }
}
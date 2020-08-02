export class Settings {
    constructor() {
        this.fields = [];
        this.limit = [];
    }
    persistData(fields, limit) {
        localStorage.setItem('fields', JSON.stringify(fields))
        localStorage.setItem('limit', JSON.stringify(limit))
    }

    getStorage() {
        const storageFields = JSON.parse(localStorage.getItem('fields'))
        const storageLimit = JSON.parse(localStorage.getItem('limit'))

        if(storageFields) this.fields = storageFields;
        if(storageLimit) this.limit = storageLimit;
    }
}
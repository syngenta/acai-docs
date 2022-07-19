const Chance = require('chance');

// let's pretend this is a database model
class Field {
    constructor() {
        this.__chance = new Chance();
    }

    idExists(id){
        if (id.startsWith('alc')){
            return false;
        }
        return true;
    }

    getFieldFromID(id) {
        const field = this.__createRandom();
        field.id = id;
        return field;
    }

    getFieldFromFarm(farmId) {
        const field = this.__createRandom();
        field.id = id;
        field.farmId = farmId;
        return field;
    }

    create(field) {
        field.id = this.__chance.guid();
        return field;
    }

    update(field) {
        return field;
    }

    delete(field) {
        return {};
    }

    __createRandom(){
        return {
            id: this.__chance.guid(),
            name: `${this.__chance.word()} Field`,
            coordinates: this.__chance.coordinates().split(','),
            created: this.__chance.date({year: new Date().getFullYear()}).toISOString(),
            modified: this.__chance.date({year: new Date().getFullYear()}).toISOString()
        }
    }
}

module.exports = Field;

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

    getFieldFromID(farmId, id) {
        const field = this.__createRandom();
        field.id = id;
        field.farmId = farmId;
        return field;
    }

    getAll(farmId) {
        const fields = [];
        for (let i=0; i < 25; i++){
            const field = this.__createRandom();
            field.farmId = farmId;
            fields.push(field);
        }
        return fields;
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
            name: `${this.__chance.word()} field`,
            coordinates: this.__chance.coordinates().split(','),
            created: this.__chance.date({year: new Date().getFullYear()}).toISOString(),
            modified: this.__chance.date({year: new Date().getFullYear()}).toISOString()
        }
    }
}

module.exports = Field;

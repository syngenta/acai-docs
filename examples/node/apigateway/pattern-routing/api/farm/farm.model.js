const Chance = require('chance');

// let's pretend this is a database model
class Farm {
    constructor() {
        this.__chance = new Chance();
    }

    idExists(id){
        if (id.startsWith('alc')){
            return false;
        }
        return true;
    }

    getFarmFromID(id) {
        const farm = this.__createRandom();
        farm.id = id;
        return farm;
    }

    create(farm) {
        farm.id = this.__chance.guid();
        return farm;
    }

    update(farm) {
        return farm;
    }

    delete(farm) {
        return {};
    }

    __createRandom(){
        return {
            id: this.__chance.guid(),
            name: `${this.__chance.name()}'s Farm`,
            address: this.__chance.address(),
            city: this.__chance.city(),
            state: this.__chance.state(),
            zip: this.__chance.zip(),
            created: this.__chance.date({year: new Date().getFullYear()}).toISOString(),
            modified: this.__chance.date({year: new Date().getFullYear()}).toISOString()
        }
    }

}

module.exports = Farm;

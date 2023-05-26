const Chance = require('chance');

// let's pretend this is a database model
class Grower {
    constructor() {
        this.__chance = new Chance();
    }

    emailExists(email){
        if (email.startsWith('alc')){
            return true;
        }
        return false;
    }

    idExists(id){
        if (id.startsWith('alc')){
            return false;
        }
        return true;
    }

    getAll() {
        const growers = [];
        for (let i=0; i < 50; i++){
            const grower = this.__createRandom();
            growers.push(grower);
        }
        return growers;
    }

    getGrowerFromID(id) {
        const grower = this.__createRandom();
        grower.id = id;
        return grower;
    }

    create(grower) {
        grower.id = this.__chance.guid();
        return grower;
    }

    update(grower) {
        return grower;
    }

    delete(grower) {
        return {};
    }

    __createRandom(){
        return {
            id: this.__chance.guid(),
            email: this.__chance.email(),
            phone: this.__chance.phone({formatted: false}),
            first: this.__chance.first().toLowerCase(),
            last: this.__chance.last().toLowerCase(),
            created: this.__chance.date({year: new Date().getFullYear()}).toISOString(),
            modified: this.__chance.date({year: new Date().getFullYear()}).toISOString()
        }
    }

}

module.exports = Grower;

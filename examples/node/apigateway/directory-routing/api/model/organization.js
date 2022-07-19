const Chance = require('chance');

// let's pretend this is a database model
class Organization {
    constructor() {
        this.__chance = new Chance();
    }

    idExists(id){
        if (id.startsWith('alc')){
            return false;
        }
        return true;
    }

    getOrgFromID(id) {
        const org = this.__createRandom();
        org.id = id;
        return org;
    }

    create(org) {
        org.id = this.__chance.guid();
        return org;
    }

    update(org) {
        return org;
    }

    delete(org) {
        return {};
    }

    __createRandom(){
        return {
            id: this.__chance.guid(),
            address: this.__chance.address(),
            city: this.__chance.city(),
            state: this.__chance.state(),
            zip: this.__chance.zip(),
            revenue: `$${this.__chance.floating({min: 1000000, max: 5000000, fixed: 2})}`,
            profit: `$${this.__chance.floating({min: 10000, max: 50000, fixed: 2})}`,
            created: this.__chance.date({year: new Date().getFullYear()}).toISOString(),
            modified: this.__chance.date({year: new Date().getFullYear()}).toISOString()
        }
    }

}

module.exports = Organization;

const Chance = require('chance');

class Grower {
    constructor() {
        this.__chance = new Chance();
    }

    getAll() {
        const growers = [];
        for (let i=0; i < 50; i++){
            const grower = this.__createRandom();
            growers.push(grower);
        }
        return growers;
    }

    __createRandom(){
        return {
            id: this.__chance.guid(),
            email: this.__chance.email(),
            phone: this.__chance.phone({formatted: false}),
            first: this.__chance.first().toLowerCase(),
            last: this.__chance.last().toLowerCase()
        }
    }

}

module.exports = Grower;

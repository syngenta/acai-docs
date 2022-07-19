const {v4: uuidv4} = require('uuid');
const GrowerModel = require('../model/grower');

class Grower {
    constructor(grower = {}, growerModel = null) {
        const now = new Date().toISOString();
        this.__id = grower.id;
        this.__email = grower.email;
        this.__phone = grower.phone;
        this.__first = grower.first;
        this.__last = grower.last;
        this.__created = grower.created || now;
        this.__modified = grower.modified || now;
        this.__model = growerModel || new GrowerModel()
    }

    static convertFromRequest(request){
        const copied = JSON.parse(JSON.stringify(request));
        copied.id = uuidv4();
        return new Grower(copied);
    }

    static async getAll(){
        const model = new GrowerModel();
        const results = await model.getAll();
        const growers = [];
        for (const result of results){
            growers.push(new Grower(result))
        }
        return growers;
    }

    static async getByID(id){
        const model = new GrowerModel();
        const result = await model.getGrowerFromID(id);
        return new Grower(result);
    }

    static async getByEmail(email){
        const model = new GrowerModel();
        const result = model.getGrowerFromEmail(email);
        return new Grower(result);
    }

    static async getByPhone(phone){
        const model = new GrowerModel();
        const result = model.getGrowerFromPhone(phone);
        return new Grower(result);
    }

    get id() {
        return this.__id;
    }

    get email() {
        return this.__email;
    }

    get phone() {
        return this.__phone;
    }

    get first() {
        return this.__first;
    }

    get last() {
        return this.__last;
    }

    get created() {
        return this.__created;
    }

    get modified() {
        return this.__modified;
    }

    merge(updatedGrower) {
        const blacklist = ['id', 'email', 'modified'];
        for (const key in this) {
            const property = key.replace('__', '');
            if (updatedGrower[property] && updatedGrower[property] !== '' && !blacklist.includes(property)) {
                this[key] = updatedGrower[property];
            }
        }
    }

    export() {
        const exported = {};
        for (const key of Object.getOwnPropertyNames(Grower.prototype)) {
            if (typeof this[key] !== 'function') {
                exported[key] = this[key];
            }
        }
        return exported;
    }

    async create(){
        return this.__model.create(this.export())
    }

    async update(){
        return this.__model.update(this.export())
    }

    async delete(){
        return this.__model.delete(this.id)
    }
}

module.exports = Grower;

const {v4: uuidv4} = require('uuid');
const FieldModel = require('../model/field');

class Field {
    constructor(field = {}, fieldModel = null) {
        const now = new Date().toISOString();
        this.__id = field.id;
        this.__farm = field.farm;
        this.__name = field.name;
        this.__coordinates = field.coordinates;
        this.__created = field.created || now;
        this.__modified = field.modified || now;
        this.__model = fieldModel || new FieldModel()
    }

    static convertFromRequest(request){
        const copied = JSON.parse(JSON.stringify(request));
        copied.id = uuidv4();
        return new Field(copied);
    }

    static async getByID(id){
        const model = new FieldModel();
        const result = await model.getOrgFromID(id);
        return new Field(result);
    }

    get id() {
        return this.__id;
    }

    get farm() {
        return this.__farm;
    }

    get name() {
        return this.__name;
    }

    get coordinates() {
        return this.__coordinates;
    }

    get created() {
        return this.__created;
    }

    get modified() {
        return this.__modified;
    }

    merge(updatedOrg) {
        const blacklist = ['id', 'created', 'modified'];
        for (const key in this) {
            const property = key.replace('__', '');
            if (updatedOrg[property] && updatedOrg[property] !== '' && !blacklist.includes(property)) {
                this[key] = updatedOrg[property];
            }
        }
    }

    export() {
        const exported = {};
        for (const key of Object.getOwnPropertyNames(Field.prototype)) {
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
}


module.exports = Field;

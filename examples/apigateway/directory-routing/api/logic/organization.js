const {v4: uuidv4} = require('uuid');
const OrgModel = require('../model/organization');

class Organization {
    constructor(org = {}, orgModel = null) {
        const now = new Date().toISOString();
        this.__id = org.id;
        this.__name = org.name;
        this.__address = org.address;
        this.__city = org.city;
        this.__state = org.state;
        this.__revenue = org.revenue;
        this.__profit = org.profit;
        this.__created = org.created || now;
        this.__modified = org.modified || now;
        this.__model = orgModel || new OrgModel()
    }

    static convertFromRequest(request){
        const copied = JSON.parse(JSON.stringify(request));
        copied.id = uuidv4();
        return new Organization(copied);
    }

    static async getByID(id){
        const model = new OrgModel();
        const result = await model.getOrgFromID(id);
        return new Organization(result);
    }

    get id() {
        return this.__id;
    }

    get name() {
        return this.__name;
    }

    get address() {
        return this.__address;
    }

    get city() {
        return this.__city;
    }

    get state() {
        return this.__state;
    }

    get revenue() {
        return this.__revenue;
    }

    get profit() {
        return this.__profit;
    }

    get created() {
        return this.__created;
    }

    get modified() {
        return this.__modified;
    }

    merge(updatedOrg) {
        const blacklist = ['id', 'revenue', 'profit', 'created', 'modified'];
        for (const key in this) {
            const property = key.replace('__', '');
            if (updatedOrg[property] && updatedOrg[property] !== '' && !blacklist.includes(property)) {
                this[key] = updatedOrg[property];
            }
        }
    }

    export() {
        const exported = {};
        for (const key of Object.getOwnPropertyNames(Organization.prototype)) {
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

module.exports = Organization;

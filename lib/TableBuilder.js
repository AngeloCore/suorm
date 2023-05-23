"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FieldBuilder_1 = __importDefault(require("./FieldBuilder"));
const IndexBuilder_1 = __importDefault(require("./IndexBuilder"));
class TableBuilder {
    constructor() {
        this._tableName = "";
        this._schemafull = false;
        this._drop = false;
        this._fields = [];
        this._index = [];
    }
    name(name) {
        this._tableName = name;
        return this;
    }
    schemafull(opt = true) {
        this._schemafull = opt;
        return this;
    }
    drop(opt = true) {
        this._drop = opt;
        return this;
    }
    addField(callback) {
        const field = typeof callback === "function"
            ? callback(new FieldBuilder_1.default().tableName(this._tableName))
            : callback;
        if (!(field instanceof FieldBuilder_1.default))
            throw new Error(`"addField" callback should return instance of FieldBuilder, received "${typeof field}" instead`);
        this._fields.push(field.build);
        return this;
    }
    addIndex(callback) {
        const index = typeof callback === "function"
            ? callback(new IndexBuilder_1.default().tableName(this._tableName))
            : callback;
        if (!(index instanceof IndexBuilder_1.default))
            throw new Error(`"addIndex" callback should return instance of IndexBuilder, received "${typeof index}" instead`);
        this._index.push(index.build);
        return this;
    }
    get build() {
        const fields = this._fields.join("");
        const index = this._index.join("");
        return `DEFINE TABLE ${this._tableName}${this._drop ? " DROP" : ""}${this._schemafull ? " SCHEMAFULL" : " SCHEMALESS"};${fields}${index}`;
    }
}
exports.default = TableBuilder;

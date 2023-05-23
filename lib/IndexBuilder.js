"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexBuilder {
    constructor() {
        this._indexName = "";
        this._tableName = "";
        this._unique = false;
        this._columns = [];
    }
    name(name) {
        this._indexName = name;
        return this;
    }
    tableName(name) {
        this._tableName = name;
        return this;
    }
    unique(opt = true) {
        this._unique = opt;
        return this;
    }
    columns(...cols) {
        this._columns = cols;
        return this;
    }
    get build() {
        if (!this._columns.length)
            throw new Error("Columns are required when an index is define. ");
        return `DEFINE INDEX ${this._indexName} ON TABLE ${this._tableName} COLUMNS ${this._columns.join(",")}${this._unique ? " UNIQUE" : ""};`;
    }
}
exports.default = IndexBuilder;

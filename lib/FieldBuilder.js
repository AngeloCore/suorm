"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
class FieldBuilder {
    constructor() {
        this._fieldName = "";
        this._tableName = "";
        this._value = "";
        this._ignoreDefaultValues = false;
        this._assertion = "";
    }
    name(name) {
        this._fieldName = name;
        return this;
    }
    tableName(name) {
        this._tableName = name;
        return this;
    }
    type(type) {
        this._type = type;
        return this;
    }
    value(val, or, ignoreDefaultValues = false) {
        this._value = val;
        if (or)
            this._valueOr = or;
        if (ignoreDefaultValues)
            this._ignoreDefaultValues = true;
        return this;
    }
    static _parseValue(val, ignoreDefaultValues = false) {
        const type = typeof val;
        let value = "";
        switch (type) {
            case "string": {
                if (types_1.defaultValues.includes(val.toUpperCase()) && !ignoreDefaultValues)
                    value = val.toUpperCase();
                else if (val.startsWith("$") && !ignoreDefaultValues)
                    value = val;
                else
                    value = `"${val}"`;
                break;
            }
            case "number":
            case "boolean":
            case "bigint":
                value =
                    type === "boolean" && !ignoreDefaultValues
                        ? String(val).toUpperCase()
                        : String(val);
                break;
            case "object":
                value = JSON.stringify(val);
                break;
            default:
                break;
        }
        return value;
    }
    assert(exp) {
        this._assertion = exp;
        return this;
    }
    get build() {
        if (this._type && !types_1.fieldDataTypes.includes(this._type))
            throw new Error(`Field type must be one of "${types_1.fieldDataTypes.join('", "')}" but received "${this._type}" instead`);
        let value = "";
        if (this._value)
            value = `VALUE ${FieldBuilder._parseValue(this._value, this._ignoreDefaultValues)}`;
        if (this._value && this._valueOr) {
            value += ` OR ${FieldBuilder._parseValue(this._valueOr, this._ignoreDefaultValues)}`;
        }
        return `DEFINE FIELD ${this._fieldName} ON TABLE ${this._tableName}${this._type ? ` TYPE ${this._type}` : ""}${value?.length ? " " + value : ""}${this._assertion ? ` ASSERT ${this._assertion}` : ""};`;
    }
}
exports.default = FieldBuilder;

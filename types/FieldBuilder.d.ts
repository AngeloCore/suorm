export default class FieldBuilder {
    private _fieldName;
    private _tableName;
    private _type?;
    private _value;
    private _valueOr?;
    private _ignoreDefaultValues;
    private _assertion;
    name(name: typeof this._fieldName): this;
    tableName(name: typeof this._tableName): this;
    type(type: typeof this._type): this;
    value(val: typeof this._value, or?: typeof this._valueOr, ignoreDefaultValues?: typeof this._ignoreDefaultValues): this;
    private static _parseValue;
    assert(exp: typeof this._assertion): this;
    get build(): string;
}

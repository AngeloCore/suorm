import { FieldDataTypes, Value, fieldDataTypes, defaultValues } from "./types";

export default class FieldBuilder {
  private _fieldName: string = "";
  private _tableName: string = "";
  private _type?: FieldDataTypes;
  private _value: "$value" | Value = "";
  private _valueOr?: Value;
  private _ignoreDefaultValues = false;
  private _assertion: string = "";

  name(name: typeof this._fieldName) {
    this._fieldName = name;
    return this;
  }

  tableName(name: typeof this._tableName) {
    this._tableName = name;
    return this;
  }

  type(type: typeof this._type) {
    this._type = type;
    return this;
  }

  value(
    val: typeof this._value,
    or?: typeof this._valueOr,
    ignoreDefaultValues: typeof this._ignoreDefaultValues = false
  ) {
    this._value = val;
    if (or) this._valueOr = or;
    if (ignoreDefaultValues) this._ignoreDefaultValues = true;

    return this;
  }

  private static _parseValue(val: any, ignoreDefaultValues = false) {
    const type = typeof val;
    let value = "";

    switch (type) {
      case "string": {
        if (defaultValues.includes(val.toUpperCase()) && !ignoreDefaultValues)
          value = val.toUpperCase();
        else if (val.startsWith("$") && !ignoreDefaultValues) value = val;
        else value = `"${val}"`;
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

  assert(exp: typeof this._assertion) {
    this._assertion = exp;
    return this;
  }

  get build() {
    // Type Checking
    if (this._type && !fieldDataTypes.includes(this._type))
      throw new Error(
        `Field type must be one of "${fieldDataTypes.join(
          '", "'
        )}" but received "${this._type}" instead`
      );

    // Value Checking
    let value = "";
    if (this._value)
      value = `VALUE ${FieldBuilder._parseValue(
        this._value,
        this._ignoreDefaultValues
      )}`;

    if (this._value && this._valueOr) {
      value += ` OR ${FieldBuilder._parseValue(
        this._valueOr,
        this._ignoreDefaultValues
      )}`;
    }

    return `DEFINE FIELD ${this._fieldName} ON TABLE ${this._tableName}${
      this._type ? ` TYPE ${this._type}` : ""
    }${value?.length ? " " + value : ""}${
      this._assertion ? ` ASSERT ${this._assertion}` : ""
    };`;
  }
}

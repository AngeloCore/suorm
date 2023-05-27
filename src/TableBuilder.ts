import FieldBuilder from "./FieldBuilder";
import IndexBuilder from "./IndexBuilder";

export default class TableBuilder {
  private _tableName: string = "";
  private _schemafull: boolean = false;
  private _drop: boolean = false;
  private _fields: string[] = [];
  private _index: string[] = [];

  name(name: string) {
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

  addField(callback: FieldBuilder | ((data: FieldBuilder) => FieldBuilder)) {
    const field =
      typeof callback === "function"
        ? callback(new FieldBuilder().tableName(this._tableName))
        : callback;

    if (!(field instanceof FieldBuilder))
      throw new Error(
        `"addField" callback should return instance of FieldBuilder, received "${typeof field}" instead`
      );

    this._fields.push(field.build);

    return this;
  }

  addIndex(callback: IndexBuilder | ((data: IndexBuilder) => IndexBuilder)) {
    const index =
      typeof callback === "function"
        ? callback(new IndexBuilder().tableName(this._tableName))
        : callback;

    if (!(index instanceof IndexBuilder))
      throw new Error(
        `"addIndex" callback should return instance of IndexBuilder, received "${typeof index}" instead`
      );

    this._index.push(index.build);

    return this;
  }

  get build() {
    const fields = this._fields.join("");
    const index = this._index.join("");

    return `DEFINE TABLE ${this._tableName}${this._drop ? " DROP" : ""}${
      this._schemafull ? " SCHEMAFULL" : " SCHEMALESS"
    };${fields}${index}`;
  }
}

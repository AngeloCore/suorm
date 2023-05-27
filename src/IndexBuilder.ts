export default class IndexBuilder {
  private _indexName: string = "";
  private _tableName: string = "";
  private _unique: boolean = false;
  private _columns: string[] = [];

  name(name: string) {
    this._indexName = name;
    return this;
  }

  tableName(name: string) {
    this._tableName = name;
    return this;
  }

  unique(opt = true) {
    this._unique = opt;
    return this;
  }

  columns(...cols: string[]) {
    this._columns = cols;
    return this;
  }

  get build() {
    if (!this._columns.length)
      throw new Error("Columns are required when an index is define. ");

    return `DEFINE INDEX ${this._indexName} ON TABLE ${
      this._tableName
    } COLUMNS ${this._columns.join(",")}${this._unique ? " UNIQUE" : ""};`;
  }
}

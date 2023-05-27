export default class IndexBuilder {
  private _indexName: string = "";
  private _tableName: string = "";
  private _unique: boolean = false;
  private _columns: string[] = [];

  name(name: IndexBuilder['_indexName']) {
    this._indexName = name;
    return this;
  }

  tableName(name: IndexBuilder['_tableName']) {
    this._tableName = name;
    return this;
  }

  unique(opt: boolean = true) {
    this._unique = opt;
    return this;
  }

  columns(...cols: IndexBuilder['_columns']) {
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

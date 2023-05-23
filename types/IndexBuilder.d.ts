export default class IndexBuilder {
    private _indexName;
    private _tableName;
    private _unique;
    private _columns;
    name(name: typeof this._indexName): this;
    tableName(name: typeof this._tableName): this;
    unique(opt?: boolean): this;
    columns(...cols: typeof this._columns): this;
    get build(): string;
}

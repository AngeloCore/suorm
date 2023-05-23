import FieldBuilder from "./FieldBuilder";
import IndexBuilder from "./IndexBuilder";
export default class TableBuilder {
    private _tableName;
    private _schemafull;
    private _drop;
    private _fields;
    private _index;
    name(name: string): this;
    schemafull(opt?: boolean): this;
    drop(opt?: boolean): this;
    addField(callback: FieldBuilder | ((data: FieldBuilder) => FieldBuilder)): this;
    addIndex(callback: IndexBuilder | ((data: IndexBuilder) => IndexBuilder)): this;
    get build(): string;
}

import TableBuilder from "./TableBuilder";
import FieldBuilder from "./FieldBuilder";
import IndexBuilder from "./IndexBuilder";
import SelectBuilder from "./SelectBuilder";
import { Projection } from "./SelectBuilder";
declare class QueryBuilder {
    get define(): {
        table: TableBuilder;
        field: FieldBuilder;
        index: IndexBuilder;
    };
    select(...projection: Projection[]): SelectBuilder;
}
export declare const suorm: QueryBuilder;
export { QueryBuilder, TableBuilder, FieldBuilder, IndexBuilder, SelectBuilder };

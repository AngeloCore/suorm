import TableBuilder from "./TableBuilder";
import FieldBuilder from "./FieldBuilder";
import IndexBuilder from "./IndexBuilder";
import SelectBuilder from "./SelectBuilder";

import { Projection } from "./SelectBuilder";

class QueryBuilder {
  get define() {
    return {
      table: new TableBuilder(),
      field: new FieldBuilder(),
      index: new IndexBuilder()
    };
  }

  select(...projection: Projection[]) {
    return new SelectBuilder(projection.flat(1));
  }
}

export const suorm = new QueryBuilder();
export {
  QueryBuilder,
  TableBuilder,
  FieldBuilder,
  IndexBuilder,
  SelectBuilder
};

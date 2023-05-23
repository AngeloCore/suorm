"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectBuilder = exports.IndexBuilder = exports.FieldBuilder = exports.TableBuilder = exports.QueryBuilder = exports.suorm = void 0;
const TableBuilder_1 = __importDefault(require("./TableBuilder"));
exports.TableBuilder = TableBuilder_1.default;
const FieldBuilder_1 = __importDefault(require("./FieldBuilder"));
exports.FieldBuilder = FieldBuilder_1.default;
const IndexBuilder_1 = __importDefault(require("./IndexBuilder"));
exports.IndexBuilder = IndexBuilder_1.default;
const SelectBuilder_1 = __importDefault(require("./SelectBuilder"));
exports.SelectBuilder = SelectBuilder_1.default;
class QueryBuilder {
    get define() {
        return {
            table: new TableBuilder_1.default(),
            field: new FieldBuilder_1.default(),
            index: new IndexBuilder_1.default()
        };
    }
    select(...projection) {
        return new SelectBuilder_1.default(projection.flat(1));
    }
}
exports.QueryBuilder = QueryBuilder;
exports.suorm = new QueryBuilder();

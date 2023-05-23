"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SelectBuilder {
    constructor(projection) {
        this._projection = [];
        this._target = "";
        this._where = "";
        this._as = "";
        this._split = [];
        this._group = [];
        this._parallel = false;
        this._projection = projection;
    }
    from(target) {
        this._target = target;
        return this;
    }
    where(con) {
        this._where = con;
        return this;
    }
    as(con) {
        this._as = con;
        return this;
    }
    split(...field) {
        this._split = field;
        return this;
    }
    group(...field) {
        this._group = field;
        return this;
    }
    limit(lim) {
        this._limit = lim;
        return this;
    }
    start(sta) {
        this._start = sta;
        return this;
    }
    timeout(time) {
        this._timeout = time;
        return this;
    }
    parallel(opt = true) {
        this._parallel = opt;
        return this;
    }
    get build() {
        if (!Array.isArray(this._projection) || !this._projection.length)
            throw new Error("At least 1 `projection` is required when selecting.");
        if (!this._target)
            throw new Error("A `target` (from) is required when selecting.");
        const where = this._where ? ` WHERE ${this._where}` : "";
        const as = this._as ? ` AS ${this._as} ` : " ";
        const split = this._split?.length ? ` SPLIT ${this._split.join(",")}` : "";
        const group = this._group?.length
            ? ` GROUP BY ${this._group.join(",")}`
            : "";
        const limit = this._limit ? ` LIMIT ${this._limit}` : "";
        const start = this._start ? ` START ${this._start}` : "";
        const timeout = this._timeout ? ` TIMEOUT ${this._timeout}` : "";
        return `SELECT ${this._projection.join(",")}${as}FROM ${this._target}${where}${split}${group}${limit}${start}${timeout}${this._parallel ? " PARALLEL" : ""};`;
    }
}
exports.default = SelectBuilder;

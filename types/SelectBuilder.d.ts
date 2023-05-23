export type Projection = "*" | (string & {});
export default class SelectBuilder {
    private _projection;
    private _target;
    private _where;
    private _as;
    private _split;
    private _group;
    private _limit?;
    private _start?;
    private _timeout?;
    private _parallel;
    constructor(projection: Projection[]);
    from(target: typeof this._target): this;
    where(con: typeof this._where): this;
    as(con: typeof this._as): this;
    split(...field: typeof this._split): this;
    group(...field: typeof this._group): this;
    limit(lim: typeof this._limit): this;
    start(sta: typeof this._start): this;
    timeout(time: typeof this._timeout): this;
    parallel(opt?: boolean): this;
    get build(): string;
}

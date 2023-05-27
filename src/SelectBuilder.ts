export type Projection = "*" | (string & {});

export default class SelectBuilder {
  private _projection: Projection[] = [];
  private _target: string = "";
  private _where: string = "";
  private _as: string = "";
  private _split: string[] = [];
  private _group: string[] = [];
  private _limit?: number;
  private _start?: number;
  private _timeout?: string;
  private _parallel: boolean = false;

  constructor(projection: Projection[]) {
    this._projection = projection;
  }

  from(target: string) {
    this._target = target;
    return this;
  }

  where(con:string) {
    this._where = con;
    return this;
  }

  as(con: string) {
    this._as = con;
    return this;
  }

  split(...field: string[]) {
    this._split = field;
    return this;
  }

  group(...field: string[]) {
    this._group = field;
    return this;
  }

  limit(lim: number) {
    this._limit = lim;
    return this;
  }

  start(sta: number) {
    this._start = sta;
    return this;
  }

  timeout(time: string) {
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

    return `SELECT ${this._projection.join(",")}${as}FROM ${
      this._target
    }${where}${split}${group}${limit}${start}${timeout}${
      this._parallel ? " PARALLEL" : ""
    };`;
  }
}

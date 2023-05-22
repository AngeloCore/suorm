# SUORM - Surreal.db ORM

A super simple query builder for surreal.db

## Installation

npm:

```sh
npm install suorm
```

yarn:

```sh
yarn add suorm
```

## Example

### Define Table

```ts
import { suorm } from "suorm";

const userTable = suorm.define.table
  .name("user")
  .schemafull()
  .addField((f) =>
    f.name("email").type("string").assert("$value != NONE && is::email($value)")
  )
  .addIndex((i) => i.name("email_index").unique().columns("email")).build;

/**
 * userTable: DEFINE TABLE user SCHEMAFULL;DEFINE FIELD email ON TABLE user TYPE string ASSERT $value != NONE && is::email($value);DEFINE INDEX email_index ON TABLE user COLUMNS email UNIQUE;
 */
```

### Select From

```ts
import { suorm } from "suorm";

const emailData = suorm
  .select("email")
  .as("address")
  .from("user")
  .where("email != NONE")
  .limit(10)
  .start(5).build;

/**
 * emailData: SELECT email AS address FROM user WHERE email != NONE LIMIT 10 START 5;
 */
```

<br />
<hr />

## ⚠️ Warning
- ### Not stable yet
- ### A lot of stuff is not implemented yet
- ### No assertion builder
- ### No permission builder
- ### Doesn't support GEO types
- ### Selection `ORDER` and `FETCH` are not implemented yet
<hr />

## Usage

### Exports

- suorm - `new QueryBuilder()`
- QueryBuilder
- TableBuilder
- FieldBuilder
- IndexBuilder
- SelectBuilder

### Example:

```ts
// Common
const {
  suorm,
  QueryBuilder,
  TableBuilder,
  FieldBuilder,
  IndexBuilder,
  SelectBuilder
} = require("suorm");

// TypeScript / ESM
import {
  suorm,
  QueryBuilder,
  TableBuilder,
  FieldBuilder,
  IndexBuilder,
  SelectBuilder
} from "suorm";
```

# **Classes**

# QueryBuilder

### `get define(): Object;`

Returns:

- table: TableBuilder
- field: FieldBuilder
- index: IndexBuilder

Example:

```ts
// Table
suorm.define.table.name("user").schemafull().build;

// Field
suorm.define.field.name("email").type("string").assert("$value != NON").build;

// Index
suorm.define.index.name("email_index").unique().columns("email").build;
```

<hr />

### `select(...projection: string[]): SelectBuilder;`

Returns:

- Instance of SelectBuilder

Example:

```ts
// SELECT * FROM user;
suorm.select("*").from("user").build;

// SELECT email,username FROM user;
suorm.select("email", "username").from("user").build;
```

# TableBuilder

### `name(name: string): this;`

Example:

```ts
table.name("user");
```

<hr />

### `schemafull(opt: boolean = true): this;`

Example:

```ts
table.schemafull();

// or schemaless (default)
table.schemafull(false);
```

<hr />

### `drop(opt: boolean = true): this;`

Example:

```ts
table.drop();
```

<hr />

### `addField(callback: FieldBuilder | ((data: FieldBuilder) => FieldBuilder)): this;`

Example:

```ts
table.addField((f) => f.name("email").type("string"));

// or

table.addField(new FieldBuilder().name("email").type("string"));
```

<hr />

### `addIndex(callback: IndexBuilder | ((data: IndexBuilder): this;`

Example:

```ts
table.addIndex((i) => i.name("email_index").columns("email"));

// or

table.addField(new IndexBuilder().name("email_index").columns("email"));
```

<hr />

### `get build(): string;`

Example:

```ts
// String Output
table.build;
```

# FieldBuilder

### `name(name: string): this;`

Example:

```ts
field.name("email");
```

<hr />

### `tableName(name: string): this;`

Example:

```ts
field.tableName("user");
```

<hr />

### `type(type: FieldDataTypes): this;`

Example:

```ts
field.type("bool");
```

<hr />

### `value(val: string | number, or?: string | number, ignoreDefaultValues: boolean = false): this;`

Description:

- Rule 1: `val/or` gets converted into UPPERCASE and an operator if is one of `DefaultValues`, e.g. `field.value("none")` = `NONE` (not `"none"`)
- Rule 2: If `val/or` starts with `$` (dollar sign) it won't be a string anymore, e.g. `field.value("$value")` = `$value` (not `"$value"`)
- Rule 3: If `val/or` is an number/boolean/bigint it won't be converted into an string and it will be in UPPERCASE, e.g. `field.value(true)` = `TRUE` (not `"true"`) and `field.value(69)` = `69` (not `"69"`)
- Rule 4: If `val/or` is an valid JS object, it will be automatically converted into an json string using JSON.stringify, e.g. `field.value({ foo: "bar" })` = `'{"foo":"bar"}'`

**If `ignoreDefaultValues` is set to `true`**:

- Rule 1 and Rule 2 wont apply anymore, e.g. `field.value("none", null, true)` = `"none"` (not `NONE`) and `field.value("$value", null, true)` = `"$value"` (not `$value`)
- Rule 3 won't apply anymore too, e.g. `field.value(true)` = `"true"` (not `TRUE`) and `field.value(69)` = `"69"` (not `69`)

Example:

```ts
field.value("foobar@example.com"); // VALUE "foobar@example.com"
field.value("$value", "none"); // VALUE $value OR NONE
field.value("$value", "none", true); // VALUE $value OR "none"
```

<hr />

### `assert(exp: string): this;`

Example:

```ts
field.assert("$value != NONE");
```

<hr />

### `get build(): string;`

Example:

```ts
// String Output
field.build;
```

# IndexBuilder

### `name(name: string): this;`

Example:

```ts
index.name("email_index");
```

<hr />

### `unique(opt: boolean = true): this;`

Example:

```ts
index.unique();
```

<hr />

### `columns(...cols: string[]): this;`

Example:

```ts
index.columns("email");

// or

index.columns("foo", "bar");
```

<hr />

### `get build(): string;`

Example:

```ts
// String Output
index.build;
```

# SelectBuilder

### `constructor(projection: string[])`

Example:

```ts
const select = new SelectBuilder(["email", "username"]);
```

<hr />

### `from(name: string): this;`

Example:

```ts
// SELECT foobar FROM user
select.from("user");
```

<hr />

### `where(con: string): this;`

Example:

```ts
select.where("email IS NOT NONE");

// or

select.where("email != NONE");
```

<hr />

### `as(con: string): this;`

Example:

```ts
// SELECT email AS address...
select.as("address");
```

<hr />

### `split(...field: string[]): this;`

Example:

```ts
// SELECT * FROM user SPLIT email;
select.split("email");

// SELECT * FROM user SPLIT email,username;
select.split("email", "username");
```

<hr />

### `group(...field: string[]): this;`

Example:

```ts
// SELECT * FROM user GROUP BY email;
select.group("email");

// SELECT * FROM user GROUP BY email,username;
select.group("email", "username");
```

<hr />

### `limit(lim: number): this;`

Example:

```ts
// SELECT * FROM user LIMIT 50;
select.limit(50);
```

<hr />

### `timeout(time: string): this;`

Example:

```ts
// SELECT * FROM user TIMEOUT 5s;
select.timeout("5s");
```

<hr />

### `start(lim: number): this;`

Example:

```ts
// SELECT * FROM user LIMIT 50 START 10;
select.start(10);
```

<hr />

### `parallel(opt: boolean = true): this;`

Example:

```ts
// SELECT * FROM user PARALLEL;
select.parallel();
```

<hr />

### `get build(): string;`

Example:

```ts
// String Output
select.build;
```

# **Types**

### **FieldDataTypes**:

`"string" | "number" | "object" | "any" | "array" | "bool" | "datetime" | "decimal" | "duration" | "float" | "int" | "record"`

### **DefaultValues**

`"NONE" | "NULL" | "TRUE" | "FALSE" | "none" | "null" | "true" | "false"`

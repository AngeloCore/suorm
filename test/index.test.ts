import { describe, expect, it } from "vitest";
import { suorm } from "../src/index";

// TODO: Add more tests
describe("Surreal ORM testing", () => {
  it("generates user table with unique email address", () => {
    const table = suorm.define.table
      .name("user")
      .schemafull()
      .addField((f) =>
        f
          .name("email")
          .type("string")
          .assert("$value != NONE && is::email($value)")
      )
      .addIndex((i) => i.name("email_index").unique().columns("email")).build;

    console.log(table);

    expect(table).toBe(
      "DEFINE TABLE user SCHEMAFULL;DEFINE FIELD email ON TABLE user TYPE string ASSERT $value != NONE && is::email($value);DEFINE INDEX email_index ON TABLE user COLUMNS email UNIQUE;"
    );
  });

  it("selects email from user table", () => {
    const selection = suorm
      .select("email")
      .as("address")
      .from("user")
      .where("email != NONE")
      .limit(10)
      .start(5).build;

    console.log(selection);

    expect(selection).toBe(
      "SELECT email AS address FROM user WHERE email != NONE LIMIT 10 START 5;"
    );
  });
});

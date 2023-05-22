export const fieldDataTypes = [
  "any",
  "array",
  "bool",
  "datetime",
  "decimal",
  "duration",
  "float",
  "int",
  "number",
  "object",
  "string",
  "record"
] as const;

export type FieldDataTypes = (typeof fieldDataTypes)[number];

export const defaultValues = ["NONE", "NULL", "TRUE", "FALSE"] as const;

export type DefaultValues = (typeof defaultValues)[number];

export type Value =
  | DefaultValues
  | Lowercase<DefaultValues>
  | number
  | (string & {});

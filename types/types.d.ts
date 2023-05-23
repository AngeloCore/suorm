export declare const fieldDataTypes: readonly ["any", "array", "bool", "datetime", "decimal", "duration", "float", "int", "number", "object", "string", "record"];
export type FieldDataTypes = (typeof fieldDataTypes)[number];
export declare const defaultValues: readonly ["NONE", "NULL", "TRUE", "FALSE"];
export type DefaultValues = (typeof defaultValues)[number];
export type Value = DefaultValues | Lowercase<DefaultValues> | number | (string & {});

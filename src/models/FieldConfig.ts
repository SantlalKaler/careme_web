export interface FieldConfig {
  key: string;
  label: string;
  type: "text" | "date";
  placeholder?: string;
  renderOrder: number;
}
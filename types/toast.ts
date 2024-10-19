export type Toast = {
  message: string;
  type: "default" | "success" | "warning" | "error";
  id?: string;
};

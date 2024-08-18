import { toast } from "react-toastify";

export const notify = (
  message: string,
  type: "info" | "success" | "warning" | "error" | "default"
) => toast(message, { autoClose: 3000, type });

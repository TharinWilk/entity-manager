import type { Toast } from "~/types/toast";

export const useToast = () => {
  const toasts = useState("toast", () => <Toast[]>[]);

  const create = (toast: Toast) => {
    toast.id = "id-" + Math.random().toString(36);
    toasts.value.push(toast);

    setTimeout(() => {
      remove();
    }, 5000);
  };

  const remove = () => {
    toasts.value.shift();
  };

  return { toasts, create };
};
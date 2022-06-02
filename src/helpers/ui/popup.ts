import { toast } from "react-toastify";

type ToastTypeOfAlert = "info" | "error" | "warning";

const baseConfig = {
  position: "top-right",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// eslint-disable-next-line import/prefer-default-export
export const showPopup = (
  message: string,
  type?: ToastTypeOfAlert,
  config?: any,
) => {
  const smallerMessage = `${message.substring(0, 70)}..`;

  toast[type || "error"](smallerMessage, config || (baseConfig as any));
};

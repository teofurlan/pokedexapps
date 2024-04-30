import Swal, { SweetAlertIcon } from "sweetalert2";

export const fireAlert = (title, type: SweetAlertIcon = "success") => {
  Swal.fire({
    position: "top-end",
    icon: type,
    toast: true,
    width: "auto",
    title,
    showConfirmButton: false,
    timer: 3000,
    customClass: {
      icon: 'text-sm',
  }
  });
};

import Swal from "sweetalert2";

export const Toast = Swal.mixin({
	toast: true,
	position: "top-start",
	showConfirmButton: false,
	timer: 2000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener("mouseenter", Swal.stopTimer);
		toast.addEventListener("mouseleave", Swal.resumeTimer);
	},
});

export const showToast = (icon, title) => {
	Toast.fire({
		icon,
		title,
	});
};

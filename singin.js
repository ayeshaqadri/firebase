import { auth,getAuth } from "./firebase.js";
import { sendPasswordResetEmail , signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

let forgotPasswordLink = document.getElementById("forgot-password");

forgotPasswordLink.addEventListener("click", () => {
    Swal.fire({
        title: "Enter your email address:",
        input: "email",
        inputLabel: "Your email",
        inputPlaceholder: "Enter your email",
        showCancelButton: true,
        confirmButtonText: "Send Reset Email",
        cancelButtonText: "Cancel",
    }).then((result) => {
        if (result.isConfirmed && result.value) {
            const email = result.value.trim();
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Password reset email sent! Please check your inbox.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error(`Error ${errorCode}: ${errorMessage}`);
                    Swal.fire({
                        icon: "error",
                        title: "Failed to send reset email",
                        text: errorMessage
                    });
                });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: "Cancelled",
                text: "Password reset process was cancelled.",
                icon: "info"
            });
        }
    });
});
let userEmail = document.getElementById("email");
let userPassword = document.getElementById("password");
let singinBtn = document.getElementById("singin-btn");

singinBtn.addEventListener("click",() =>{
    const auth = getAuth();
    const email = userEmail.value.trim();
    const password = userPassword.value.trim();

    if (!email || !password) {
        Swal.fire({
            icon: "error",
            title: "Missing Information",
            text: "Please enter both email and password.",
        });
        return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Sign-In Successful:", user);
        Swal.fire({
            icon: "success",
            title: "Welcome!",
            text: `You are now signed in as ${user.email}.`,
            showConfirmButton: true,
            timer: 90000

        });
        window.location.href = "./website.html";
    })

    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error ${errorCode}: ${errorMessage}`);
        Swal.fire({
            icon: "error",
            title: "Sign-In Failed",
            text: "wrong email or password",
        });
    });
});



export {sendPasswordResetEmail ,auth};

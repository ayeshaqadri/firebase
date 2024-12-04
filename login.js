import { getAuth, signInWithEmailAndPassword } from "./firebase.js";

let emailField = document.getElementById("useremail");
let passwordField = document.getElementById("userpassword");
let loginBtn = document.getElementById("singup-btn");

loginBtn.addEventListener("click", () => {
    if (emailField.value.trim() && passwordField.value.trim()) {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, emailField.value, passwordField.value)
            .then((userCredential) => {
                console.log("Login successful:", userCredential.user);
                location.href = "index.html"; // Redirect to a dashboard page
            })
            .catch((error) => {
                const errorMessage = error.message;
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: errorMessage,
                });
            });
    } else {
        Swal.fire({
            icon: "warning",
            title: "Incomplete Form",
            text: "Please fill out all fields.",
        });
    }
});

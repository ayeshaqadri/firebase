import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";


// let userEmail = document.getElementById("email");
// let userPassword = document.getElementById("password");
// let singinBtn = document.getElementById("singin-btn");

// singinBtn.addEventListener("click",() =>{
//     const auth = getAuth();
//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         // Signed in 
//         const user = userCredential.user;
//         // ...
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//       });
// })

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

export { getAuth, sendPasswordResetEmail };

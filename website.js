import { collection, addDoc, deleteDoc, updateDoc, doc, getDocs,db } from "./firebase.js";

var background;

// Add Post
async function addPost() {
    const postTitle = document.getElementById("post-title");
    const postDescrip = document.getElementById("post-description");
    const posts = document.getElementById("posts");

    if (postTitle.value.trim() && postDescrip.value.trim()) {
        try {
            const docRef = await addDoc(collection(db, "posts"), {
                title: postTitle.value,
                description: postDescrip.value,
                background: background || "",
                createdAt: new Date(),
            });

            console.log("Document written with ID: ", docRef.id);

            const newPost = `
                <div class="card mt-3" data-id="${docRef.id}">
                    <div class="card-header fontStyle">@Posts</div>
                    <div class="card-body" style="background-image:url(${background})">
                        <h5 class="card-title fontStyle" id="updatedPost">${postTitle.value}</h5>
                        <p class="card-text fontStyle" id="updatedDescription">${postDescrip.value}</p>
                    </div>
                    <div class="d-flex p-3 gap-3">
                        <button type="button" class="btn btn-success edit-btn">Edit</button>
                        <button type="button" class="btn btn-danger delete-btn">Delete</button>
                    </div>
                </div>`;

            posts.insertAdjacentHTML("beforeend", newPost);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your post has been created",
                showConfirmButton: false,
                timer: 1500,
            });

            postTitle.value = "";
            postDescrip.value = "";
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    } else {
        Swal.fire({
            title: "Empty input?",
            text: "Write something",
            icon: "question",
        });
    }
}

// Confirm Remove
async function confirmRemove(postCard, postId) {
    Swal.fire({
        title: "Do you want to delete this post?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await deleteDoc(doc(db, "posts", postId));
                postCard.remove();
                Swal.fire("Done!", "Your post has been deleted.", "success");
            } catch (e) {
                console.error("Error deleting document: ", e);
            }
        } else if (result.isDenied) {
            Swal.fire("Post not deleted", "", "info");
        }
    });
}

// Edit Post
async function editPost(postCard, postId) {
    const updatedPost = postCard.querySelector("#updatedPost");
    const updatedDescription = postCard.querySelector("#updatedDescription");

    const { value: formValues } = await Swal.fire({
        title: "Update your post",
        html: `
            <input id="swal-input1" class="swal2-input alert-input" placeholder="Write here..." value="${updatedPost.innerHTML}">
            <input id="swal-input2" class="swal2-input alert-input" placeholder="Write here..." value="${updatedDescription.innerHTML}">
        `,
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById("swal-input1").value,
                document.getElementById("swal-input2").value,
            ];
        },
    });

    if (formValues) {
        try {
            await updateDoc(doc(db, "posts", postId), {
                title: formValues[0],
                description: formValues[1],
            });
            updatedPost.innerHTML = formValues[0];
            updatedDescription.innerHTML = formValues[1];
            Swal.fire("Success", "Post updated successfully!", "success");
        } catch (e) {
            console.error("Error updating document: ", e);
        }
    }
}

// Load Posts
async function loadPosts() {
    const posts = document.getElementById("posts");

    try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        querySnapshot.forEach((doc) => {
            const post = doc.data();
            const newPost = `
                <div class="card mt-3" data-id="${doc.id}">
                    <div class="card-header fontStyle">@Posts</div>
                    <div class="card-body" style="background-image:url(${post.background})">
                        <h5 class="card-title fontStyle" id="updatedPost">${post.title}</h5>
                        <p class="card-text fontStyle" id="updatedDescription">${post.description}</p>
                    </div>
                    <div class="d-flex p-3 gap-3">
                        <button type="button" class="btn btn-success edit-btn">Edit</button>
                        <button type="button" class="btn btn-danger delete-btn">Delete</button>
                    </div>
                </div>`;
            posts.insertAdjacentHTML("beforeend", newPost);
        });
    } catch (e) {
        console.error("Error loading documents: ", e);
    }
}

// Handle image selection
function selectImg(src, event) {
    background = src;
    document.querySelectorAll(".small-img").forEach((img) => img.classList.remove("selectImg"));
    event.target.classList.add("selectImg");
}

// Event listeners for static buttons
document.querySelector(".btn-primary").addEventListener("click", addPost);

// Event delegation for dynamic buttons
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const postCard = event.target.closest(".card");
        const postId = postCard.getAttribute("data-id");
        confirmRemove(postCard, postId);
    } else if (event.target.classList.contains("edit-btn")) {
        const postCard = event.target.closest(".card");
        const postId = postCard.getAttribute("data-id");
        editPost(postCard, postId);
    }
});

// Event listeners for images
document.querySelectorAll(".small-img").forEach((img) =>
    img.addEventListener("click", (event) => selectImg(img.src, event))
);

// Load posts on page load
loadPosts();

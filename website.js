var background;


function addPost() {
    var postTitle = document.getElementById("post-title");
    var postDescrip = document.getElementById("post-description");
    var posts = document.getElementById("posts");

    if (postTitle.value.trim() && postDescrip.value.trim()) {
        posts.innerHTML += `
        <div class="card mt-3">
            <div class="card-header fontStyle">@Posts</div>
            <div class="card-body" style="background-image:url(${background})">
                <h5 class="card-title fontStyle" id="updatedPost">${postTitle.value}</h5>
                <p class="card-text fontStyle" id="updatedDescription">${postDescrip.value}</p>
            </div>
            <div class="d-flex p-3 gap-3">
                <button type="button" class="btn btn-success" onclick="editPost(event)">Edit</button>
                <button type="button" class="btn btn-danger" onclick="confirmRemove(event)">Delete</button>
            </div>
        </div>`;
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your post has been creted",
            showConfirmButton: false,
            timer: 1500
          });
        
        postTitle.value = "";
        postDescrip.value = "";
    } else {
        Swal.fire({
            title: "Empty input?",
            text: "Write something",
            icon: "question"
        });
    }
}
function confirmRemove(event) {
    Swal.fire({
        title: "Do you want to delete this post?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No"
    }).then((result) => {
        if (result.isConfirmed) {
            event.target.parentNode.parentNode.remove();
            Swal.fire("Done!", "Your post has been deleted.", "success");
        } else if (result.isDenied) {
            Swal.fire("Post not deleted", "", "info");
        }
    });
}
async function editPost() {
    const { value: formValues } = await Swal.fire({
        title: "Update your post",
        html: `
          <input id="swal-input1" class="swal2-input alert-input" placeholder="Write here..." >
          <input id="swal-input2" class="swal2-input alert-input" placeholder="Write here..." >
        `,
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById("swal-input1").value,
            document.getElementById("swal-input2").value
          ];
        }
      });
      var updatedPost = document.getElementById("updatedPost")
      var updatedDescription = document.getElementById("updatedDescription")
      updatedPost.innerHTML = formValues[0]
      updatedDescription.innerHTML = formValues[1]
}


function selectImg(src, event) {
    // Store the selected image as background
    background = src;

    // Remove 'selectImg' class from all images
    const allImages = document.querySelectorAll('.small-img');
    allImages.forEach(img => img.classList.remove('selectImg'));

    // Add 'selectImg' class to the clicked image for visual feedback
    event.target.classList.add('selectImg');
}













// function selectImg(src){

//     background =src

//     event.target.className +=" selectImg"
// }
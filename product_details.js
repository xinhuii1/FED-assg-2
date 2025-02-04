const urlParams = new URLSearchParams(window.location.search); // Get query params
const productId = parseInt(urlParams.get('id')); // Get product ID from URL

fetch('products.json') // Fetch the products.json
    .then(response => response.json()) // Parses info into an array
    .then(products => {
        const product = products.find(p => p.productId === productId); // Find product using productId

        if (product) { // If the product exists
            document.querySelector(".product-title").textContent = product.title; 
            document.querySelector(".product-price").textContent = product.price;
            document.querySelector(".product-image").src = product.image;

            let rating = product.rating;
            let stars = document.querySelectorAll(".review-box i");

            for (let i = 0; i < stars.length; i++) { // Update stars based on rating
                if (i < rating) {
                    stars[i].classList.remove("fa-regular");
                    stars[i].classList.add("fa-solid");
                } else {
                    stars[i].classList.remove("fa-solid");
                    stars[i].classList.add("fa-regular");
                }
            }
            document.querySelector(".product-rating").textContent = product.rating.toFixed(1);
            document.querySelector(".product-total-review").textContent = `(${product.totalReview} Reviews)`;
            document.querySelector(".product-description").textContent = product.description;
            document.querySelector(".product-weight").textContent = `Weight: ${product.weight} lbs`;
            document.querySelector(".product-dimension").textContent = `Dimensions: ${product.dimensions} in`;

            // Fetch profile using userId from product
            fetchProfile(product.userId);
        }
    });

function fetchProfile(userId) {
    fetch('profile.json') // Fetch profile.json using userId
        .then(response => response.json())
        .then(profiles => {
            const profile = profiles.find(p => p.userId === userId); // Find profile using userId

            if (profile) {
                document.querySelector(".seller-icon").src = profile.icon;
                document.querySelector(".seller-name").textContent = profile.username;
                document.querySelector(".seller-status").textContent = profile.status;
                document.querySelector(".seller-joined").textContent = `${profile.years} years ago`;

                let rating = profile.rating;
                let stars = document.querySelectorAll(".seller-container .stars i");

                for (let i = 0; i < stars.length; i++) {
                    if (i < rating) {
                        stars[i].classList.remove("fa-regular");
                        stars[i].classList.add("fa-solid");
                    } else {
                        stars[i].classList.remove("fa-solid");
                        stars[i].classList.add("fa-regular");
                    }
                }

                document.querySelector(".review-rating").textContent = profile.rating.toFixed(1);
                document.querySelector(".total-reviews").textContent = `of ${profile.totalReview} reviews`;

                // View Profile Button Redirect
                const visitProfileButton = document.querySelector(".visit-profile-button");
                visitProfileButton.setAttribute("data-id", profile.userId);
                visitProfileButton.addEventListener("click", function () {
                    window.location.href = `seller_profile.html?id=${profile.userId}`;
                });

                const tagsContainer = document.querySelector(".seller-tags");
                tagsContainer.innerHTML = "";
                profile.comments.forEach(comment => {
                    const tagDiv = document.createElement("div");
                    tagDiv.classList.add("tag");
                    tagDiv.innerHTML = `<i class="fa-solid fa-thumbs-up"></i> ${comment}`;
                    tagsContainer.appendChild(tagDiv);
                });
            }
        });
}

function showTabContent(tabName) {
    document.querySelector("#content-descriptions").style.display = 'none';
    document.querySelector("#content-additional").style.display = 'none';
    document.querySelector("#content-reviews").style.display = 'none';

    document.querySelector("#tab-descriptions").style.borderBottom = '5px solid transparent';
    document.querySelector("#tab-additional").style.borderBottom = '5px solid transparent';
    document.querySelector("#tab-reviews").style.borderBottom = '5px solid transparent';

    document.querySelector(`#content-${tabName}`).style.display = 'block';
    document.querySelector(`#tab-${tabName}`).style.borderBottom = '5px solid #5E3E1A';
}

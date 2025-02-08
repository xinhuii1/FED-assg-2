// Function to handle adding a product to the cart in Firebase
function addToCart(event) {
    const productElement = event.target.closest('.product-details-container');
    const itemId = productElement.dataset.id; // Get item ID
    const itemName = productElement.querySelector('.product-title').textContent; // Get product name
    const itemPrice = parseFloat(productElement.querySelector('.product-price').textContent.replace('$', '')); // Get product price
    const itemQuantity = parseInt(productElement.querySelector('input[type="number"]').value); // Get quantity

    // Call Firebase function to add this item to the cart
    addCartItemToFirebase(itemId, itemName, itemPrice, itemQuantity);

    // Optionally, show a success message or update the UI
    alert('Item added to cart!');
}

// Firebase function to add item to the cart in Firebase Realtime Database
function addCartItemToFirebase(itemId, itemName, itemPrice, itemQuantity) {
    const cartRef = firebase.database().ref('cartItems'); // Reference to cartItems in Firebase

    const newItem = {
        itemId,
        itemName,
        itemPrice,
        itemQuantity,
        isSelected: true  // Item is selected by default
    };

    // Push the new item to Firebase
    cartRef.push(newItem)
        .then(() => {
            console.log('Item added to Firebase');
        })
        .catch((error) => {
            console.error('Error adding item to Firebase:', error);
        });
}

// Dynamically add event listeners to all Add to Cart buttons when page loads
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.add-cart-button').forEach(button => {
        button.addEventListener('click', addToCart);
    });
});


// Fetch the seller profile
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

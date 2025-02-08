// Function to handle adding a product to the cart
function addToCart(event) {
    const productElement = event.target.closest('.product-details-container');
    const itemId = productElement.dataset.id; // Assuming you have a data-id attribute on the container
    const itemName = productElement.querySelector('.product-title').textContent;
    const itemPrice = parseFloat(productElement.querySelector('.product-price').textContent.replace('$', ''));
    const itemQuantity = parseInt(productElement.querySelector('input[type="number"]').value); // Quantity from the input field

    // Call the function to send this data to RestDB (cart API)
    addCartItem(itemId, itemName, itemPrice, itemQuantity);

    // Redirect to the Cart Page after adding item to the cart
    window.location.href = "cart.html"; // Redirect to cart page
}

// Add event listener to the "Add to Cart" button
document.querySelector('.add-cart-button').addEventListener('click', addToCart);

// Function to add item to the cart (RestDB API)
function addCartItem(itemId, itemName, itemPrice, itemQuantity) {
    const apiUrl = 'https://mokesell-0891.restdb.io/rest/cartitems'; // RestDB API URL for cart items
    const headers = {
        'Content-Type': 'application/json',
        'x-apikey': '67a4eec1fd5d5864f9efe119'  // Your RestDB API key
    };

    const newItem = {
        itemId,
        itemName,
        itemPrice,
        itemQuantity,
        isSelected: true    // Item is selected by default
    };

    // Send the item to RestDB using a POST request
    fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(newItem)  // Send the item data as JSON to RestDB
    })
    .then(response => response.json())
    .then(data => {
        console.log('Item added:', data);
        // Optionally, show a success message or update the cart UI here
    })
    .catch(error => console.error('Error adding item:', error));
}

// Fetch product details based on productId from URL
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

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

/*fetch('products.json') // Fetch the products.json
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
    });*/

var currProduct = [];
var sellerProfile = [];
var sellerUsername = null;

document.addEventListener("DOMContentLoaded", async function () {
    await fetchCurrProduct();
    console.log("Final listings:", currProduct);

    updateProduct();

    if (currProduct.length > 0) {
        await fetchProfile(currProduct[0].ownerId);
    }

    if (sellerProfile && sellerProfile.userId) {
        await fetchSellerUsername(currProduct[0].ownerId);
    }

    updateProfile();

    console.log("Product Owner: ", currProduct[0].ownerId);
    console.log("seller profile:", sellerProfile)
    console.log("Seller Profile Id: ", sellerProfile.userId);
    console.log("Seller Username: ", sellerUsername);
});

async function fetchCurrProduct() {
    try {
        let response = await fetch(
            `https://mokesell-0891.restdb.io/rest/listings?q={"listingid":${productId}}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-apikey": "67a4eec1fd5d5864f9efe119"
                }
            }
        );

        let data = await response.json();
        if (data.length > 0) {
            currProduct = data;
        } else {
            console.error("No product found for listingid:", productId);
        }

        console.log("Fetched listings:", currProduct);
    } catch (error) {
        console.error("Error fetching listings:", error);
    }
}

function updateProduct() {
    if (currProduct.length === 0) return;

    const product = currProduct[0];
    document.querySelector(".product-title").textContent = product.itemname;
    document.querySelector(".product-price").textContent = `${formatPrice(product.price)}`;
    document.querySelector(".product-image").src = product.image;

    console.log("currProduct.name:", product.itemname);
    console.log("currProduct.price:", product.price);
    console.log("currProduct.image:", product.image);
}

function formatPrice(price) {
    return `$${parseFloat(price).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
}

async function fetchProfile(userId) {
    try {
        let query = encodeURIComponent(JSON.stringify({ "userId": userId }));

        let response = await fetch(`https://mokesell-0891.restdb.io/rest/profile?q={"userId":${userId}}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": "67a4eec1fd5d5864f9efe119"
            }
        });

        let data = await response.json();
        if (data.length > 0) {
            sellerProfile = data[0];
        } else {
            console.error("No profile found for userId:", userId);
        }

        console.log("Fetched profile:", sellerProfile);
    } catch (error) {
        console.error("Error fetching profile:", error);
    }
}

async function fetchSellerUsername(userId) {
    try {
        let query = encodeURIComponent(JSON.stringify({ userId: userId }));

        let response = await fetch(`https://mokesell-0891.restdb.io/rest/user-profile?q={"userId":${userId}}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": "67a4eec1fd5d5864f9efe119"
            }
        });

        let data = await response.json();
        console.log("seller username data:", data); 
        if (data.length > 0) {
            sellerUsername = data[0].username;
        } else {
            console.error("No username found for userId:", userId);
        }

        console.log("Fetched username:", sellerUsername);
    } catch (error) {
        console.error("Error fetching username:", error);
    }
}

function updateProfile() {
    if (!sellerProfile || Object.keys(sellerProfile).length === 0) return;

    document.querySelector(".seller-icon").src = sellerProfile.icon || "default.jpg";
    document.querySelector(".seller-name").textContent = sellerUsername || "Unknown Seller";
    document.querySelector(".seller-status").textContent = sellerProfile.status || "N/A";
    document.querySelector(".seller-joined").textContent = sellerProfile.years ? `${sellerProfile.years} years ago` : "Unknown";

    console.log("Updated Profile:", sellerProfile);

    let rating = sellerProfile.rating;
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

    document.querySelector(".review-rating").textContent = sellerProfile.rating.toFixed(1);
    document.querySelector(".total-reviews").textContent = `of ${sellerProfile.totalReview} reviews`;

    // View Profile Button Redirect
    const visitProfileButton = document.querySelector(".visit-profile-button");
    visitProfileButton.setAttribute("data-id", sellerProfile.userId);
    visitProfileButton.addEventListener("click", function () {
        window.location.href = `seller_profile.html?id=${sellerProfile.userId}`;
    });

    const tagsContainer = document.querySelector(".seller-tags");
    tagsContainer.innerHTML = "";
    sellerProfile.comments.forEach(comment => {
        const tagDiv = document.createElement("div");
        tagDiv.classList.add("tag");
        tagDiv.innerHTML = `<i class="fa-solid fa-thumbs-up"></i> ${comment}`;
        tagsContainer.appendChild(tagDiv);
    });
}
    



// Fetch the seller profile
/*function fetchProfile(userId) {
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
}*/

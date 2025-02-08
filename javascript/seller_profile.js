// Get the Seller ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const userId = parseInt(urlParams.get('id')); // Get seller ID from URL

// Function to fetch and display seller profile details
function fetchSellerProfile(userId) {
    fetch('profile.json') // Fetch profile data
        .then(response => response.json())
        .then(profiles => {
            const profile = profiles.find(p => p.userId === userId); // Find profile by userId

            if (profile) {
                document.querySelector(".profile-img").src = profile.icon;
                document.querySelector(".profile-text h2").textContent = profile.username; // Match your HTML
                document.querySelector(".profile-status").textContent = profile.status;
                document.querySelector(".profile-rating").textContent = 
                    `${profile.rating.toFixed(1)}⭐ | ${profile.years}`;
            }
        });
}

// Function to fetch and display seller's product listings
function fetchSellerListings(userId) {
    fetch('products.json') // Fetch product data
        .then(response => response.json())
        .then(products => {
            const sellerListings = products.filter(product => product.userId === userId); // Filter by seller

            const listingsContainer = document.querySelector(".listings-container");
            listingsContainer.innerHTML = ""; // Clear existing listings

            if (sellerListings.length > 0) {
                sellerListings.forEach(product => {
                    const listingItem = document.createElement('div');
                    listingItem.className = 'listing-item';

                    listingItem.innerHTML = `
                        <img src="${product.image}" alt="${product.title}" class="product-img">
                        <h3>${product.title}</h3>
                        <p class="item-condition">Brand New</p>
                        <p class="price">${product.price}</p>
                    `;

                    listingItem.querySelector(".product-img").addEventListener("click", () => {
                        window.location.href = `product_details.html?id=${product.productId}`;
                    });

                    listingsContainer.appendChild(listingItem);
                });
            } else {
                listingsContainer.innerHTML = `<p>No listings available for this seller.</p>`;
            }
        });
}

// Filter product listings by search input
function filterListings() {
    let input = document.getElementById("search-bar").value.toLowerCase();
    let listings = document.querySelectorAll(".listing-item");

    listings.forEach(item => {
        let title = item.querySelector("h3").textContent.toLowerCase();
        item.style.display = title.includes(input) ? "" : "none"; 
    });
}

// Ensure the script runs after the page is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    fetchSellerProfile(userId);
    fetchSellerListings(userId);
});

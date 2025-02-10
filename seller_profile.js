// Get the Seller ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const userId = parseInt(urlParams.get('id')); // Get seller ID from URL
var sellerusername = null

var sellerListings = []
var active = []
var inactive = []


const API_KEY = "67a4eec1fd5d5864f9efe119";

const headers = {
    'Content-Type': 'application/json',
    'x-apikey': API_KEY
};
// Function to fetch and display seller profile details
async function fetchSellerProfile(userId) {
    fetch(`https://mokesell-0891.restdb.io/rest/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": "67a4eec1fd5d5864f9efe119"
        }
    })
    .then(response => response.json())
    .then(profiles => {
        console.log(profiles)
        const profile = profiles.find(p => p.userId === userId); // Find profile by userId
        console.log(profile)

        if (profile) {
            document.querySelector(".profile-img").src = profile.icon;
            document.querySelector(".profile-text h2").textContent = sellerusername; // Match your HTML
            document.querySelector(".profile-status").textContent = profile.status;
            document.querySelector(".profile-rating").textContent = 
                `${profile.rating.toFixed(1)}⭐ | ${profile.years}`;
        }
    });
}

// Function to fetch and display seller's product listings
async function fetchSellerListings(userId) {
    /*fetch('products.json') // Fetch product data
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
        });*/



        const listingsContainer = document.querySelector(".listings-container");
        listingsContainer.innerHTML = ""; // Clear existing listings

        if (sellerListings.length > 0) {
            sellerListings.forEach(product => {
                if(isListingActive(product)){
                const listingItem = document.createElement('div');
                listingItem.className = 'listing-item';

                listingItem.innerHTML = `
                    <img src="${product.image}" alt="${product.title}" class="product-img">
                    <h3>${product.itemname}</h3>
                    <p class="item-condition">${product.condition}</p>
                    <p class="price">$${formatPrice(product.price)}</p>
                `;

                listingItem.querySelector(".product-img").addEventListener("click", () => {
                    window.location.href = `product_details.html?id=${product.listingid}`;
                });

                listingsContainer.appendChild(listingItem);

                const activeCountElement = document.getElementById("active-listings-counts");
                activeCountElement.textContent = parseInt(activeCountElement.textContent) + 1;
            }
            });
        } else {
            listingsContainer.innerHTML = `<p>No listings available for this seller.</p>`;
        }
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
document.addEventListener("DOMContentLoaded", async function() {
    await fetchSellerUsername(userId);
    await fetchSellerProfile(userId);
    await getSellerListings();
    console.log("Seller Listings:", sellerListings);
    await fetchSellerListings(userId);
});



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
            sellerusername = data[0].username;
        } else {
            console.error("No username found for userId:", userId);
        }

        console.log("Fetched username:", sellerusername);
    } catch (error) {
        console.error("Error fetching username:", error);
    }
}


async function getSellerListings() {
    if (!userId) {return []};
    console.log(`curr user id: ${userId}`)
    try {
        const response = await fetch(`https://mokesell-0891.restdb.io/rest/listings?q={"ownerId": ${userId}}`, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch listings. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Listings:", data);
        sellerListings = data;
    } catch (error) {
        console.error("Error fetching listings:", error);
        return [];
    }
}

function isListingActive(listing) {
    const currentDate = new Date();
    console.log(listing.CreateDate);
    const listingCreateDate = new Date(listing.CreateDate);
    const bump = listing.bump || 0;
    let activeUntil = new Date(listingCreateDate);


    activeUntil.setDate(activeUntil.getDate() + 30 + bump);
    return currentDate <= activeUntil;
}

function formatPrice(price) {
    return `$${parseFloat(price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
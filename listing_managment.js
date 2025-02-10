let currentListing = null; // Stores the currently selected listing for bumping

var myListings = []
var active = []
var inactive = []

// Handles bumping a listing.
// Opens the bump modal.
// Applies a free 30-day expiry if not already set.
function bumpListing(button) {
    if (button.disabled) return; // Prevent multiple clicks

    document.getElementById('bump-modal').style.display = 'block';
    currentListing = button.closest('.listing-item'); 

    // If no expiry date is set, apply a default 30-day expiry
    if (!currentListing.getAttribute('data-expiry-date')) {
        setFreeListingExpiry(currentListing);
    }
}

// Closes the bump modal. 
function closeBumpModal() {
    document.getElementById('bump-modal').style.display = 'none';
}

// Sets a free 30-day expiry for listings.
function setFreeListingExpiry(listing) {
    const currentDate = new Date();
    const expiryDate = new Date(currentDate);
    expiryDate.setDate(currentDate.getDate() + 30); // Adds 30 days

    listing.setAttribute('data-expiry-date', expiryDate.toISOString());

    // Updates expiry info UI
    const expiryInfo = listing.querySelector('.expiry-info');
    if (expiryInfo) {
        expiryInfo.textContent = '30 days left (Free)';
    }
}

// Select all bump options and listen for click events
document.querySelectorAll('.bump-option').forEach(option => {
    option.addEventListener('click', async function () {
        // Remove 'selected' class from all options first
        document.querySelectorAll('.bump-option').forEach(opt => opt.classList.remove('selected'));

        // Add 'selected' class to the clicked option
        this.classList.add('selected');

        // Apply the bump to the listing
        const duration = this.getAttribute('data-duration');
        const price = this.getAttribute('data-price');
        await applyBump(duration, price);
    });
});


// Applies the selected bump duration to the listing.
async function applyBump(duration, price) {
    if (!currentListing) return;
    console.log(currentListing);

    let expiryDays;
    if (duration === '1-week') {
        expiryDays = 7;
    } else if (duration === '1-month') {
        expiryDays = 30;
    } else if (duration === '3-month') {
        expiryDays = 90;
    }

    // Calculate new expiry date
    const currentExpiryDate = new Date(currentListing.getAttribute('data-expiry-date'));
    currentExpiryDate.setDate(currentExpiryDate.getDate() + expiryDays);

    currentListing.setAttribute('data-expiry-date', currentExpiryDate.toISOString());

    // Update expiry info UI
    const expiryInfo = currentListing.querySelector('.expiry-info');
    if (expiryInfo) {
        expiryInfo.textContent = `${expiryDays + 30} days left`;
    }

    const bumpInfo = { bump: expiryDays };  // Ensure that bump is a number, not a string

    const listingId = currentListing.getAttribute('data-id'); // Assuming listing has an ID attribute

    try {
        // Define headers
        const headers = {
            'Content-Type': 'application/json',
            'x-apikey': API_KEY,  // Replace with your actual API key
            'cache-control': 'no-cache'
        };

        // Send PATCH request to update the bump value
        const patchBump = await fetch(`https://mokesell-0891.restdb.io/rest/listings/${listingId}`, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(bumpInfo)  // Send bump as an object with numeric value
        });

        if (!patchBump.ok) {
            throw new Error("Bump Failed");
        }

        const bump = await patchBump.json();
        console.log('Bump updated successfully:', bump);

    } catch (error) {
        console.error("Error bumping listing (fetch):", error);
        return;
    }
}



// Confirms and applies the bump effect.
function confirmBump() {
    if (!currentListing) return;

    const button = currentListing.querySelector('.bump-btn');
    button.textContent = 'Bumped';
    button.disabled = true;

    updateExpiryInfo(currentListing);
    closeBumpModal();
}

// Updates expiry information dynamically.
function updateExpiryInfo(listing) {
    const expiryDate = new Date(listing.getAttribute('data-expiry-date'));
    const currentDate = new Date();
    const remainingDays = Math.ceil((expiryDate - currentDate) / (1000 * 60 * 60 * 24));

    const expiryInfo = listing.querySelector('.expiry-info');
    if (expiryInfo) {
        expiryInfo.textContent = expiryDate < currentDate ? 'Expired' : `${remainingDays} days left`;
    }
}

// Filters listings based on user input.
function filterListings() {
    const searchInput = document.getElementById('search-bar').value.toLowerCase();
    const listings = document.querySelectorAll('.listing-item');
    let matchFound = false;

    listings.forEach(listing => {
        const title = listing.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchInput)) {
            listing.style.display = '';  // Show listing
            matchFound = true;
        } else {
            listing.style.display = 'none';  // Hide listing
        }
    });

    if (!matchFound) {
        alert('No listings found.');
    }
}

// Event listeners for bump options
document.querySelectorAll('.bump-option').forEach(option => {
    option.addEventListener('click', function() {
        const duration = this.getAttribute('data-duration');
        const price = this.getAttribute('data-price');
        applyBump(duration, price);
    });
});

// Initialize expiry info for all listings on page load
window.onload = () => {
    const listings = document.querySelectorAll('.listing-item');
    listings.forEach(listing => {
        const expiryDate = listing.getAttribute('data-expiry-date');
        if (expiryDate) {
            updateExpiryInfo(listing);
        } else {
            setFreeListingExpiry(listing);
        }
    });
};

// Opens the "Create Listing" modal. 
function openCreateModal() {
    document.getElementById('create-modal').style.display = 'block';  
}

// Closes the "Create Listing" modal. 
function closeCreateModal() {
    document.getElementById('create-modal').style.display = 'none';  
}

// Handles the form submission for creating a new listing.
document.getElementById("create-listing-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent page reload

    // Get form data
    const category = document.getElementById("category").value;
    const itemName = document.getElementById("item-name").value;
    const price = document.getElementById("price").value;
    const condition = document.getElementById("condition").value;
    const description = document.getElementById("description").value;

    const listingImage = document.getElementById("image");
    const imageFile = listingImage.files[0];
    const imageFormData = new FormData();
    imageFormData.append("file", imageFile);
    imageFormData.append("upload_preset", "Belle'sMokesell"); // Replace with your preset name
    imageFormData.append("cloud_name", "dnvvhbjnv"); // Replace with your Cloudinary cloud name

    // Hardcoded Direct Image URL 
    let imageUrl = "";
        try {
            const imageUploadResponse = await fetch("https://api.cloudinary.com/v1_1/dnvvhbjnv/image/upload", {
                method: "POST",
                body: imageFormData,
            });

            if (!imageUploadResponse.ok) {
                throw new Error("Image upload failed");
            }

            const imageData = await imageUploadResponse.json();
            imageUrl = imageData.secure_url; // Use the secure_url to get the image URL
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image.");
            return;
        }

    console.log("Image URL being sent:", imageUrl); // 

    // RestDB URL (Replace with your actual API URL)
    const restDB_URL = "https://mokesell-0891.restdb.io/rest/listings";  

    try {
        // Prepare JSON data
        const listingData = {
            category: category,
            itemname: itemName,
            price: price,
            condition: condition,
            description: description,
            image: imageUrl, // Store the image URL in RestDB
            ownerId: userid,
            CreateDate: new Date().toISOString()
        };

        // Send to RestDB
        const response = await fetch(restDB_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": "67a4eec1fd5d5864f9efe119", // API key for creating listings
            },
            body: JSON.stringify(listingData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`RestDB Error ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log("RestDB Response:", data); // Debugging

        // Create Listing Element
        const newListing = document.createElement("div");
        newListing.classList.add("listing-item");
        newListing.setAttribute("data-id", data._id);  // Use the ID returned from RestDB

        newListing.innerHTML = `
            <img src="${data.image}" alt="${itemName}" onerror="this.onerror=null; this.src='https://via.placeholder.com/150';">
            <h3>${itemName}</h3>
            <p>$${price}</p>
            <p class="item-condition">${condition}</p>
            <p>${description}</p>
            <button class="bump-btn" onclick="bumpListing(this)">Bump</button>
            <p class="expiry-info">30 days left (Free)</p>
        `;

        // Append new listing below existing listings
        document.querySelector(".listings-container").appendChild(newListing);

        // Update active listings count
        const activeCountElement = document.getElementById("active-listings-counts");
        activeCountElement.textContent = parseInt(activeCountElement.textContent) + 1;

        // Close the modal
        closeCreateModal();

        alert("New listing successfully created!");

    } catch (error) {
        console.error("Fetch error:", error);
        alert("Error creating listing: " + error.message);
    }
});



const userid = localStorage.getItem("userid")

const API_URL = "https://mokesell-0891.restdb.io/rest/profile";
const API_KEY = "67a4eec1fd5d5864f9efe119";

const headers = {
    'Content-Type': 'application/json',
    'x-apikey': API_KEY
};

async function fetchProfile() {
    if (userid){
    try {
        const query = userid ? `q={"userId":${userid}}` : ""; // Ensure correct formatting
        const response = await fetch(`${API_URL}?${query}`, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch user profile. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Data:", data);
        return data; // Ensure it returns an array
    } catch (error) {
        console.error("Error fetching profile:", error);
        return []; // Return an empty array if there's an error
    }
}
}

async function displayInfo() {
    const profiles = await fetchProfile(); // Await the data properly
    const profileimg = document.querySelector(".profile-img");
    const profilename = document.querySelector(".profile-name");
    const profilestatus = document.querySelector(".profile-status");
    const profilerating = document.querySelector(".profile-rating");


    if (!profiles || profiles.length === 0) {
        console.error("No profile found for the given user ID.");
        if (profileimg) profileimg.src = "img/default-profile.png"; 
        if (profilename) profilename.textContent = "Login to view profile";
        if (profilestatus) profilestatus.textContent = "No status available";
        if (profilerating) profilerating.textContent = "N/A";
        return
    }
    const profile = profiles[0];


    console.log("Profile Data:", profile); // Debugging log

    // Selecting DOM elements

    const username = await getUsername();
    console.log("Username:", username);

    if (profileimg) profileimg.src = profile.icon || "default.jpg"; 
    if (profilename) profilename.textContent = username || "Unknown User";
    if (profilestatus) profilestatus.textContent = profile.status || "No status available";
    if (profilerating) profilerating.textContent = `${profile.rating}⭐  | ${profile.years}y` || "N/A";
}

// Run when the document is fully loaded
document.addEventListener("DOMContentLoaded", displayInfo);


document.addEventListener("DOMContentLoaded", async function () {
    myListings = await getMyListings();
    seperateListings();
    console.log("My Listings:", myListings);

    const listingsContainer = document.querySelector(".listings-container");
    myListings.forEach(listing => {
        const newListing = document.createElement("div");
        newListing.classList.add("listing-item");
        newListing.setAttribute("data-id", listing._id);

        if(isListingActive(listing)) {
        newListing.innerHTML = `
        <div>
            <img src="${listing.image}" alt="${listing.image}" onerror="this.onerror=null; this.src='https://via.placeholder.com/150';">
            <h3>${listing.itemname}</h3>
            <p>${formatPrice(listing.price)}</p>
            <p class="item-condition">${listing.condition}</p>
            <p>${listing.description}</p>
            <button class="bump-btn" onclick="bumpListing(this)">Bump</button>
            <p class="expiry-info">
                ${getDaysLeft(listing)} days left 
                (${listing.bump ? 'paid' : 'free'})
            </p>

        </div>
        `;
        } else {
            newListing.innerHTML = `
            <div class="inactive">
            <img src="${listing.image}" alt="${listing.image}" onerror="this.onerror=null; this.src='https://via.placeholder.com/150';">
            <h3>${listing.itemname}</h3>
            <p>${formatPrice(listing.price)}</p>
            <p class="item-condition">${listing.condition}</p>
            <p>${listing.description}</p>
            <button class="bump-btn" onclick="bumpListing(this)">Bump</button>
            <p class="expiry-info">expired</p>
            </div>
        `;}

        listingsContainer.appendChild(newListing);
    });



    function getDaysLeft(listing) {
        // Get the create date of the listing and convert it to a Date object
        const createDate = new Date(listing.CreateDate);
        
        // Add 30 days to the create date (initial listing duration)
        const expiryDate = new Date(createDate);
        expiryDate.setDate(expiryDate.getDate() + 30); // Default 30 days from the create date
        
        // Add the bump days to the expiry date
        const bumpDays = listing.bump || 0;
        expiryDate.setDate(expiryDate.getDate() + bumpDays); // Add bump days to expiry date
        
        // Calculate the difference between the current date and the expiry date in milliseconds
        const currentDate = new Date();
        const timeDifference = expiryDate - currentDate;
        
        // Convert the time difference to days (milliseconds to days)
        const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        
        return daysLeft;
    }
    





    const activeCountElement = document.getElementById("active-listings-counts");
    activeCountElement.textContent = `${active.length}`;
});

function formatPrice(price) {
    return `$${parseFloat(price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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

async function getMyListings() {
    if (!userid) {return []};
    console.log(`curr user id: ${userid}`)
    try {
        const response = await fetch(`https://mokesell-0891.restdb.io/rest/listings?q={"ownerId": ${userid}}`, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch listings. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Listings:", data);
        return data;
    } catch (error) {
        console.error("Error fetching listings:", error);
        return [];
    }
}


function seperateListings() {
    myListings.forEach(listing => {
        if(isListingActive(listing)) {
            active.push(listing);
        } else {
            inactive.push(listing);
        }
    });
    myListings = [...active, ...inactive]
}



async function getUsername() {
    try {
        const response = await fetch(`https://mokesell-0891.restdb.io/rest/user-profile?q={"userId": ${userid}}`, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch listings. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched Listings:", data);
        return data[0].username;
    } catch (error) {
        console.error("Error fetching listings:", error);
        return null;
    }
}



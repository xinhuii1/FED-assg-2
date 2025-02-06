let currentListing = null; // Stores the currently selected listing for bumping

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
    option.addEventListener('click', function () {
        // Remove 'selected' class from all options first
        document.querySelectorAll('.bump-option').forEach(opt => opt.classList.remove('selected'));

        // Add 'selected' class to the clicked option
        this.classList.add('selected');

        // Apply the bump to the listing
        const duration = this.getAttribute('data-duration');
        const price = this.getAttribute('data-price');
        applyBump(duration, price);
    });
});


// Applies the selected bump duration to the listing.
 
function applyBump(duration, price) {
    if (!currentListing) return;

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

    // Hardcoded Direct Image URL 
    const imageUrl = "https://i.ibb.co/5xBHMh9Y/sweater.webp"; 

    console.log("Image URL being sent:", imageUrl); // Debugging

    // MockAPI URL
    const mockAPI_URL = "https://67a24866409de5ed5254ed20.mockapi.io/api/mocktest/apifirst";

    try {
        // Prepare JSON data
        const listingData = {
            category,
            itemName,
            price,
            condition,
            description,
            image: imageUrl, // Store the image URL in MockAPI
        };

        // Send to MockAPI
        const response = await fetch(mockAPI_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(listingData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`MockAPI Error ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log("MockAPI Response:", data); // Debugging

        // Create Listing Element
        const newListing = document.createElement("div");
        newListing.classList.add("listing-item");
        newListing.setAttribute("data-id", data.id);

        newListing.innerHTML = `
            <img src="${data.image}" alt="${itemName}" onerror="this.onerror=null; this.src='https://via.placeholder.com/150';">
            <h3>${itemName}</h3>
            <p>$${price}</p>
            <p class="item-condition">${condition}</p>
            <p>${description}</p>
            <button class="bump-btn" onclick="bumpListing(this)">Bump</button>
            <p class="expiry-info">30 days left (Free)</p>
        `;

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

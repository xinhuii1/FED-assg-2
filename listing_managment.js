let currentListing = null; // Make sure this is properly initialized globally

// Function to handle bumping a listing
function bumpListing(button) {
    if (button.disabled) return; // Prevent multiple clicks

    // Display the modal
    document.getElementById('bump-modal').style.display = 'block';
    currentListing = button.closest('.listing-item'); // Set current listing to the closest listing-item

    // If no expiry date is set for the listing, add a free 30 days expiry
    if (!currentListing.getAttribute('data-expiry-date')) {
        setFreeListingExpiry(currentListing);
    }
}

// Close the bump modal
function closeBumpModal() {
    document.getElementById('bump-modal').style.display = 'none';
}

// Function to set free listing expiry for listings (30 days from now)
function setFreeListingExpiry(listing) {
    const currentDate = new Date();
    const expiryDate = new Date(currentDate);
    expiryDate.setDate(currentDate.getDate() + 30);  // Add 30 days to current date
    
    listing.setAttribute('data-expiry-date', expiryDate.toISOString());

    const expiryInfo = listing.querySelector('.expiry-info');
    if (expiryInfo) {
        expiryInfo.textContent = '30 days left (Free)';
    }
}

// Function to apply bump duration (1-week, 1-month, or 3-month)
function applyBump(duration, price) {
    if (!currentListing) return; // If no listing is selected, return

    let expiryDays;

    // Set expiry based on duration
    if (duration === '1-week') {
        expiryDays = 7;
    } else if (duration === '1-month') {
        expiryDays = 30;
    } else if (duration === '3-month') {
        expiryDays = 90;
    }

    // Calculate the new expiry date
    const currentExpiryDate = new Date(currentListing.getAttribute('data-expiry-date'));
    currentExpiryDate.setDate(currentExpiryDate.getDate() + expiryDays);  // Add the bump duration

    currentListing.setAttribute('data-expiry-date', currentExpiryDate.toISOString());

    // Update the expiry info text
    const expiryInfo = currentListing.querySelector('.expiry-info');
    if (expiryInfo) {
        expiryInfo.textContent = `${expiryDays + 30} days left`;
    }

    // Highlight the selected bump option
    const bumpOptions = document.querySelectorAll('.bump-option');
    bumpOptions.forEach(option => {
        option.classList.remove('selected');
    });

    // Mark the clicked option as selected
    const selectedOption = document.querySelector(`.bump-option[data-duration="${duration}"]`);
    if (selectedOption) {
        selectedOption.classList.add('selected');
    }
}

// Function to confirm and apply the bump
function confirmBump() {
    if (!currentListing) return; // If no current listing, do nothing

    const button = currentListing.querySelector('.bump-btn');
    button.textContent = 'Bumped'; // Change text to 'Bumped'
    button.disabled = true;        // Disable the button to prevent further clicks

    // Update the expiry info for the listing
    updateExpiryInfo(currentListing);

    // Close the bump modal after confirmation
    closeBumpModal();
}

// Function to update expiry info (display remaining days or expired)
function updateExpiryInfo(listing) {
    const expiryDate = new Date(listing.getAttribute('data-expiry-date'));
    const currentDate = new Date();
    const remainingDays = Math.ceil((expiryDate - currentDate) / (1000 * 60 * 60 * 24));

    const expiryInfo = listing.querySelector('.expiry-info');
    if (expiryInfo) {
        if (expiryDate < currentDate) {
            expiryInfo.textContent = 'Expired';
        } else {
            expiryInfo.textContent = `${remainingDays} days left`;
        }
    }
}

// Function to handle the search functionality
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
        applyBump(duration, price);  // Apply the bump based on the selected option
    });
});

// Initialize expiry info for all listings on page load
window.onload = () => {
    const listings = document.querySelectorAll('.listing-item');
    listings.forEach(listing => {
        const expiryDate = listing.getAttribute('data-expiry-date');
        if (expiryDate) {
            updateExpiryInfo(listing); // If expiry date exists, update it
        } else {
            setFreeListingExpiry(listing); // If no expiry, set the free listing expiry (30 days)
        }
    });
};

// Open the modal
function openCreateModal() {
    document.getElementById('create-modal').style.display = 'block';  // Make the modal visible
}

// Close the modal
function closeCreateModal() {
    document.getElementById('create-modal').style.display = 'none';  // Hide the modal
}

// Handle form submission to create a new listing
document.getElementById('create-listing-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from reloading the page

    // Get form values
    const category = document.getElementById('category').value;
    const itemName = document.getElementById('item-name').value;
    const price = document.getElementById('price').value;
    const condition = document.getElementById('condition').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('item-image').files[0];

    // Validate form data (you can add more validation here)
    if (!category || !itemName || !price || !condition || !description || !image) {
        alert('Please fill in all fields!');
        return;
    }

    // Create a new listing item
    const newListing = document.createElement('div');
    newListing.classList.add('listing-item');
    
    // Create the image URL
    const imageUrl = URL.createObjectURL(image);

    // Add the item details
    newListing.innerHTML = `
        <img src="${imageUrl}" alt="${itemName}">
        <h3>${itemName}</h3>
        <p>$${price}</p>
        <p class="item-condition">${condition}</p>
        <p>${description}</p>
        <button class="bump-btn" onclick="bumpListing(this)">Bump</button>
        <p class="expiry-info">30 days left (Free)</p>
    `;

    // Append the new listing to the listings container
    document.querySelector('.listings-container').appendChild(newListing);

    // Close the modal
    closeCreateModal();
});

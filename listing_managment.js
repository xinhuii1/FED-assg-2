// Utility function to calculate and update the expiry information
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

// Function to handle search functionality
function filterListings() {
    const searchInput = document.getElementById('search-bar').value.toLowerCase();
    const listings = document.querySelectorAll('.listing-item');
    let matchFound = false;

    listings.forEach(listing => {
        const title = listing.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchInput)) {
            listing.style.display = '';      // Show listing
            matchFound = true;
        } else {
            listing.style.display = 'none';  // Hide listing
        }
    });

    if (!matchFound) {
        alert('No listings found.');
    }
}

// Function to open the bump modal for a listing
function bumpListing(button) {
    if (button.disabled) return;                                              // Prevent multiple clicks on already bumped listings

    document.getElementById('bump-modal').style.display = 'block';
    currentListing = button.closest('.listing-item');

    // If no expiry date is set, 30 days of free listing from now as expiry
    if (!currentListing.getAttribute('data-expiry-date')) {
        setFreeListingExpiry(currentListing);
    }
}

// Function to close the bump menu modal
function closeBumpModal() {
    document.getElementById('bump-modal').style.display = 'none';
}

// Function to set expiry date for free listings (30 days)
function setFreeListingExpiry(listing) {
    const currentDate = new Date();
    const expiryDate = new Date(currentDate);
    expiryDate.setDate(currentDate.getDate() + 30);  // 30 days from now
    
    listing.setAttribute('data-expiry-date', expiryDate.toISOString());

    const expiryInfo = listing.querySelector('.expiry-info');
    if (expiryInfo) {
        expiryInfo.textContent = '30 days left (Free)';
    }
}

// Function to apply the bump option (1-week, 1-month, 3-month)
function applyBump(duration, price) {
    if (!currentListing) return; 

    const listing = currentListing;
    let expiryDays;

    // Set the bump data for the listing 
    if (duration === '1-week') {
        expiryDays = 7;
    } else if (duration === '1-month') {
        expiryDays = 30;
    } else if (duration === '3-month') {
        expiryDays = 90;
    }

    // Calculate the new expiry date (current 30 days + bump duration)
    const currentExpiryDate = new Date(listing.getAttribute('data-expiry-date'));
    currentExpiryDate.setDate(currentExpiryDate.getDate() + expiryDays);           // Add bump duration to the 30 days
    
    listing.setAttribute('data-expiry-date', currentExpiryDate.toISOString());

    const expiryInfo = listing.querySelector('.expiry-info');
    if (expiryInfo) {
        expiryInfo.textContent = `${expiryDays + 30} days left`;                  // Show updated expiry time
    }

    // Highlight selected option
    const bumpOptions = document.querySelectorAll('.bump-option');
    bumpOptions.forEach(option => {
        option.classList.remove('selected');
    });

    const selectedOption = document.querySelector(`[data-duration="${duration}"]`);
    selectedOption.classList.add('selected');
}

// Function to confirm and apply bump, updating button text and expiry
function confirmBump() {
    if (!currentListing) return; 

    const button = currentListing.querySelector('.bump-btn');
    button.textContent = 'Bumped';                                 // Change the button text to 'Bumped'
    button.disabled = true;                                        // Disable the button to prevent further clicks

    // Update expiry info for the listing
    updateExpiryInfo(currentListing);

    // Close the modal after confirmation
    closeBumpModal();
}

// Function to check if listings are expired (either due to 30-day free period or after bump expiry)
function checkListingExpiry() {
    const listings = document.querySelectorAll('.listing-item');
    listings.forEach(listing => {
        const expiryDate = listing.getAttribute('data-expiry-date');
        if (!expiryDate) {
            return;                                                 // Skip listings that haven't been bumped yet
        }

        const expiryDateObj = new Date(expiryDate);
        const currentDate = new Date();

        if (expiryDateObj < currentDate) {
            listing.classList.add('inactive');
            listing.querySelector('.expiry-info').textContent = 'Expired';  
        }
    });
}

// Call checkListingExpiry on page load to mark expired listings
window.onload = () => {
    checkListingExpiry();
    // Set 30 days expiry for listings that don't have an expiry date yet (Free)
    document.querySelectorAll('.listing-item').forEach(listing => {
        if (!listing.getAttribute('data-expiry-date')) {
            setFreeListingExpiry(listing);                      // Set free listing expiry (30 days)
        }
    });
};

// Add event listeners for bump options
document.querySelectorAll('.bump-option').forEach(option => {
    option.addEventListener('click', function() {
        const duration = this.getAttribute('data-duration');
        const price = this.getAttribute('data-price');
        applyBump(duration, price);                            // Apply bump duration based on clicked option
    });
});

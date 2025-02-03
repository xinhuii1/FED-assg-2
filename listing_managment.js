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



// Function to handle bump button functionality
function bumpListing(button) {
    if (button.disabled) return;  // Prevent multiple clicks on already bumped listings

    button.disabled = true;
    button.textContent = 'Bumped';  // Change button text to "Bumped"
    button.style.backgroundColor = '#8f623e';  // Change button color to indicate it's disabled

    // Update expiry info
    const listingItem = button.closest('.listing-item');
    const expiryInfo = listingItem.querySelector('.expiry-info');
    
    if (expiryInfo) {
        expiryInfo.textContent = '30 days left';  // Update expiry info text
    }
}



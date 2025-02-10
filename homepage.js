
// Function to filter products by category
function filterProductsByCategory(category) {
    const productItems = document.querySelectorAll('.product-item');
    const selectedCategory = category.toLowerCase(); // Convert to lowercase

    productItems.forEach(function(product) {
        const productCategory = product.getAttribute('data-category').toLowerCase(); // Convert to lowercase

        // Show product if it matches the selected category or 'All' is selected
        if (productCategory === selectedCategory || selectedCategory === 'all') {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Function to show all products
function showAllProducts() {
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(function(product) {
        product.style.display = 'block'; // Show all products
    });
}

// Function to handle category click events
function handleCategoryClick() {
    document.querySelectorAll('.category-item').forEach(function(category) {
        category.addEventListener('click', function() {
            const selectedCategory = category.querySelector('p').textContent;

            // Check if the clicked category is already selected
            if (category.classList.contains('selected')) {
                category.classList.remove('selected');
                showAllProducts(); // Show all products when deselected
            } else {
                // First, remove 'selected' class from all categories
                document.querySelectorAll('.category-item').forEach(function(cat) {
                    cat.classList.remove('selected');
                });
                
                // Now, add the 'selected' class to the clicked category
                category.classList.add('selected');

                // Filter products based on selected category
                filterProductsByCategory(selectedCategory);
            }
        });
    });
}






var allListings = []
var featured = []

document.addEventListener('DOMContentLoaded', async function() {
    await fetchallListings();
    getFeatured();
});


async function fetchallListings() {
    try {
        let response = await fetch("https://mokesell-0891.restdb.io/rest/listings", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": "67a4eec1fd5d5864f9efe119"
            }
        });

        allListings = await response.json(); // Properly awaiting response.json()
        console.log("Fetched listings:", allListings);
    } catch (error) {
        console.error("Error fetching listings:", error);
    }
}


function getFeatured() {
    const product1 = document.querySelector('.Product1');
    product1.innerHTML = ``; // Clear existing products

    // Assuming `allListings` is an array of products
    console.log (allListings);
    allListings.forEach(listing => {
        if (isListingActive(listing)) {
            console.log(listing.category);
        product1.innerHTML += `
        <div class="product-item col-12 col-sm-6 col-md-4 col-lg-3" data-category="${listing.category}">
            <div class="square-box">
                <img src="${listing.image}" alt="Image inside box" class="square-image">
            </div>
            <h4>${listing.itemname} ></h4>
        </div>
        `;
        }
    });

    // Reapply category filter functionality after generating new products
    handleCategoryClick();
}

// Initially load featured products and apply category filtering

function formatPrice(price) {
    return `$${parseFloat(price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function isListingActive(listing) {
    const currentDate = new Date();
    console.log(listing.CreateDate);
    const listingCreateDate = new Date(listing.CreateDate);
    let activeUntil = new Date(listingCreateDate);


    activeUntil.setDate(activeUntil.getDate() + 30);
    return currentDate <= activeUntil;
}


const scrollContainers = document.querySelectorAll('.Product1');
scrollContainers.forEach(function (scrollContainer) {
    scrollContainer.addEventListener('wheel', function (e) {
        e.preventDefault();
        const scrollSpeed = 3;
        scrollContainer.scrollLeft += e.deltaY * scrollSpeed;
    });
});
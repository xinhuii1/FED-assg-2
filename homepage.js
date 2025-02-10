// Function to open the sign-up modal
function openSignUpModal(event) {
    event.preventDefault(); // Prevent default behavior (e.g., form submission or link navigation)

    // Fetch the sign-up modal content
    fetch('sign_up.html')
        .then(response => response.text())
        .then(html => {
            // Inject the fetched HTML into the modal placeholder
            document.getElementById('modal-placeholder').innerHTML = html;

            // Load any necessary scripts for the modal
            const modalScript = document.createElement('script');
            modalScript.src = 'modal.js'; // Script for modal functionality
            modalScript.onload = () => {
                console.log('Modal JS loaded');
            };
            document.body.appendChild(modalScript);

            // Load any additional scripts for the sign-up functionality
            const signUpScript = document.createElement('script');
            signUpScript.src = 'sign_up.js'; // Script for sign-up functionality
            signUpScript.onload = () => {
                console.log('Sign up JS loaded');
            };
            document.body.appendChild(signUpScript);

            // Trigger the modal animation or display logic
            Animation1('.full-screen-wrapper', '.modal-container');
        })
        .catch(error => {
            console.error('Error loading sign-up modal content:', error);
        });
}

// Function to open the login modal
function openLoginModal(event) {
    event.preventDefault(); // Prevent default behavior

    // Fetch the login modal content
    fetch('login.html')
        .then(response => response.text())
        .then(html => {
            // Inject the fetched HTML into the modal placeholder
            document.getElementById('modal-placeholder').innerHTML = html;

            // Load any necessary scripts for the modal
            const modalScript = document.createElement('script');
            modalScript.src = 'modal.js'; // Script for modal functionality
            modalScript.onload = () => {
                console.log('Modal JS loaded');
            };
            document.body.appendChild(modalScript);

            // Load any additional scripts for the login functionality
            const loginScript = document.createElement('script');
            loginScript.src = 'login.js'; // Script for login functionality
            loginScript.onload = () => {
                console.log('Login JS loaded');
            };
            document.body.appendChild(loginScript);

            // Trigger the modal animation or display logic
            Animation1('.full-screen-wrapper', '.modal-container');
        })
        .catch(error => {
            console.error('Error loading login modal content:', error);
        });
}

// Select the register button by its class
const registerButton = document.querySelector('.Register-button');

const anonymousHandler = function(event) {
    openSignUpModal(event)
};
// Add a click event listener to the register button


registerButton.addEventListener('click', anonymousHandler);

// Select the login button by its class
const loginButton = document.querySelector('.login-button');

// Add a click event listener to the login button
loginButton.addEventListener('click', function(event) {
    openLoginModal(event); // Open the login modal
});



// Function to filter products by category
function filterProductsByCategory(category) {
    const productItems = document.querySelectorAll('.product-item');

    productItems.forEach(function(product) {
        const productCategory = product.getAttribute('data-category');

        // Show product if it matches the selected category or 'All' is selected
        if (productCategory === category || category === 'All') {
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

            // First, remove 'selected' class from all categories
            document.querySelectorAll('.category-item').forEach(function(cat) {
                cat.classList.remove('selected');
            });

            // Now, add the 'selected' class to the clicked category
            category.classList.add('selected');

            // Filter products based on selected category
            filterProductsByCategory(selectedCategory);
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
        console.log(listing.category);
        product1.innerHTML += `
        <div class="product-item col-12 col-sm-6 col-md-4 col-lg-3" data-category="${listing.category}">
            <div class="square-box">
                <img src="${listing.image}" alt="Image inside box" class="square-image">
            </div>
            <h4>${listing.itemname} ></h4>
        </div>
        `;
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



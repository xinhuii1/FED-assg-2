
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

const searchbar = document.querySelector('.searchbar');

document.addEventListener('DOMContentLoaded', async function() {
    await fetchallListings();
    getFeatured();
    autocomplete(searchbar, allListings.map(listing => listing.itemname));
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




function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) return false;

        currentFocus = -1;

        /* Create a container for autocomplete items inside .Searchbar */
        let searchbarContainer = document.querySelector(".Searchbar"); // Ensure it's appended inside this
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");

        /* Append it inside the Searchbar instead of parentNode */
        searchbarContainer.appendChild(a);

        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

                b.addEventListener("click", function (e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });

                a.appendChild(b);
            }
        }
    });

    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

  

  document.querySelector(".searchbar").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {  // or event.keyCode === 13
        event.preventDefault(); // Prevent form submission (if inside a form)
        console.log("Enter key pressed!");
        showResults();
    }
});


function showResults() {
    const resultSection = document.querySelector('main')
    resultSection.innerHTML = 
    `
    <h2>Search Results for ${searchbar.value}</h2>
    `;
    allListings.forEach(listing => {
        if (listing.itemname.toLowerCase().includes(searchbar.value.toLowerCase())) {
            resultSection.innerHTML += `
            <div class="product-item col-12 col-sm-6 col-md-4 col-lg-3" data-category="${listing.category}">
            <div class="square-box">
                <img src="${listing.image}" alt="Image inside box" class="square-image">
            </div>
            <h4>${truncateString(listing.itemname, 20)} ></h4>
        </div>
            `
        }
    })
}
const categoryList = document.querySelector('.category-list');

// Variables to track the starting mouse position and scroll position
let isMouseDown = false;
let startX;
let scrollLeft;

// Listen for mouse down event to start tracking the drag
categoryList.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    startX = e.pageX - categoryList.offsetLeft;  // Get the starting X position of the mouse
    scrollLeft = categoryList.scrollLeft;        // Get the current scroll position of the container
    categoryList.style.cursor = 'grabbing';       // Change cursor to indicate dragging
});

// Stop the drag when mouse button is released or mouse leaves the area
categoryList.addEventListener('mouseup', () => {
    isMouseDown = false;
    categoryList.style.cursor = 'grab';           // Reset cursor when mouse is released
});

categoryList.addEventListener('mouseleave', () => {
    isMouseDown = false;
    categoryList.style.cursor = 'grab';           // Reset cursor when mouse leaves the area
});

// Handle mouse move to scroll horizontally when dragging
categoryList.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;  // Don't do anything if mouse is not down

    const x = e.pageX - categoryList.offsetLeft;  // Get the new position of the mouse
    const move = (x - startX) * 2;                 // Calculate movement distance (adjust for speed)

    categoryList.scrollLeft = scrollLeft - move;   // Update the scroll position based on movement
});


function truncateString(str, length) {
    if (str.length > length) {
      return str.substring(0, length) + '...'; // Adding ellipsis at the end
    } else {
      return str;
    }
  }
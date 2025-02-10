/*fetch('products.json')                                              //Fetch the products.json
    .then(response => response.json())                              
    .then(products => {
        const productGrid = document.querySelector("#productGrid")  //Container where the products will be added
        products.forEach(product => {                               // Iterate over the array of prdoducts
            const productItem = document.createElement('div');      //Create a new <div> element to represent a product item
            productItem.className = 'product-item';                 //Create a class for the <div> for css styling
            productItem.innerHTML =                                 //What would be called in html
             `
                <img src="${product.image}" alt="${product.title}">        
                <div >
                    <div class="product-title">${product.title}</div>
                    <div class="product-header">
                        <img class="product-icon" src="${product.icon}" alt="${product.title}">
                         <span class="username">${product.username}</span>
                         <div class="product-price">${product.price}</div>
                    </div>                          
                </div>
            `;
            productItem.addEventListener('click', () =>{                              //Add a click event
                window.location.href = `product_details.html?id=${product.productId}`;       //Navigates to a new URL, ? start of query parameter using the property
            });                                                                       //used as key: value to pass the info to another page
            productGrid.appendChild(productItem);                                     //Append the product item to the 'productGrid' container
        });
    })*/


var allListings = []; // Global variable

document.addEventListener("DOMContentLoaded", async function() {
    await fetchallListings();
    console.log("final listings:", allListings); // Using a comma instead of '+' for better logging
    displayListings();
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

function displayListings() {
    const productGrid = document.querySelector("#productGrid");
    allListings.forEach(listing => {
        if(isListingActive(listing)) {
        const productItem = document.createElement("div");
        productItem.className = "product-item";
        productItem.innerHTML = `
            <img src="${listing.image}" alt="${listing.itemname}">
            <div>
                <div class="product-title">${listing.itemname}</div>
                <div class="product-header">
                    <img class="product-icon" src="${listing.icon}" alt="${listing.itemname}">
                    <span class="username">${listing.category}</span>
                    <div class="product-price">$${formatPrice(listing.price)}</div>
                </div>
            </div>
        `;
        productItem.addEventListener("click", () => {
            window.location.href = `product_details.html?id=${listing.listingid}`;
        });
        productGrid.appendChild(productItem);}
    });
}

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




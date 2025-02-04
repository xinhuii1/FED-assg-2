const urlParams = new URLSearchParams(window.location.search);                            // Get the query string from the current page's URL and make it an object
const productId = parseInt(urlParams.get('id'));                                          // Retrieves the value of a specific query parameter using the key, id

fetch('products.json')                                                                    // Fetch the products.json
    .then(response => response.json())                                                    // parses info into an array
    .then(products => {
        const product = products.find(p => p.id === productId);                           // Find the product with the matching IDI
                                                                                          // // in product.js and json 
        //TODO: Check it
        if (product) {                                                                    // If the product exists
            document.querySelector(".product-title").textContent = product.title;         // Set product title
            document.querySelector(".product-price").textContent = product.price;
            document.querySelector(".product-image").src = product.image;

            let rating = product.rating;                                                  // based on the product rating, can be reassigned
            let stars = document.querySelectorAll(".review-box i");                       // stars = nodelist

            for (let i = 0; i < stars.length; i++) {                                      // Update the star icons to match the product rating
                if (i < rating) {
                    stars[i].classList.remove("fa-regular");
                    stars[i].classList.add("fa-solid");
                } 
                else {
                    stars[i].classList.remove("fa-solid");
                    stars[i].classList.add("fa-regular");
                }
            }
            document.querySelector(".product-rating").textContent = product.rating.toFixed(1);                     // to fix-> decimal
            document.querySelector(".product-total-review").textContent = "(" + product.totalReview + " Reviews)"  //initializing the values to its css
            document.querySelector(".product-description").textContent = product.description;
            document.querySelector(".product-weight").textContent = "Weight: " + product.weight + " lbs"
            document.querySelector(".product-dimension").textContent = "Dimensions: " + product.dimensions + " in"
            const numberOfProducts = products.length; 
        }})

fetch('profile.json')
    .then((response) => response.json())
    .then((profiles) => {
        const profile = profiles.find((p) => p.id === productId); // Find the profile by ID

        if (profile) {
            document.querySelector(".seller-icon").src = profile.icon;
            document.querySelector(".seller-name").textContent = profile.username;
            document.querySelector(".seller-status").textContent = profile.status;
            document.querySelector(".seller-joined").textContent = profile.years + " years ago";

            let rating = profile.rating;
            let stars = document.querySelectorAll(".seller-container .stars i");


            for (let i = 0; i < stars.length; i++) {
                if (i < rating) {
                    stars[i].classList.remove("fa-regular");
                    stars[i].classList.add("fa-solid");
                } else {
                    stars[i].classList.remove("fa-solid");
                    stars[i].classList.add("fa-regular");
                }
            }

            document.querySelector(".review-rating").textContent = profile.rating;
            document.querySelector(".total-reviews").textContent =
                "of " + profile.totalReview + " reviews";
            document.querySelector(".seller-comments").textContent =
                profile.comments.join(", ");
        } 
    })

    
function showTabContent(tabName) {
    document.querySelector("#content-descriptions").style.display = 'none';                       // Hide the contents , to reset the state
    document.querySelector("#content-additional").style.display = 'none';
    document.querySelector("#content-reviews").style.display = 'none';
    //Remove all the colour
    document.querySelector("#tab-descriptions").style.borderBottom = '5px solid transparent';     // Initializing the line as transparent
    document.querySelector("#tab-additional").style.borderBottom = '5px solid transparent';
    document.querySelector("#tab-reviews").style.borderBottom = '5px solid transparent';

    document.querySelector(`#content-${tabName}`).style.display = 'block';                        //#content-${tabName}`) determining the class in css
                                                                                                  // block ensures that element becomes visible
    document.querySelector(`#tab-${tabName}`).style.borderBottom = '5px solid #5E3E1A';           // Changing the colour of the line to make it visible
}
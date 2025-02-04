fetch('products.json')                                              //Fetch the products.json
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
    })
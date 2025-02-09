
// Assuming products.json is already fetched
let currentPage = 1;
const productsPerPage = 13; // 5 products per page

// Fetch the products from the products.json file
fetch('products.json')                                             
    .then(response => response.json())                              
    .then(products => {
        const productGrid = document.querySelector("#productGrid");  // The container to display products
        const pagination = document.querySelector('.pagination');    // Pagination container
        
        // Function to render products on the current page
        function renderProducts(page) {
            productGrid.innerHTML = ''; // Clear previous products
            const start = (page - 1) * productsPerPage; // Starting index of products for the page
            const end = start + productsPerPage; // Ending index of products for the page
            const currentProducts = products.slice(start, end); // Get the subset of products for the current page

            currentProducts.forEach(product => {
                const productItem = document.createElement('div');
                productItem.className = 'product-item';
                productItem.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">        
                    <div>
                        <div class="product-title">${product.title}</div>
                        <div class="product-header">
                            <img class="product-icon" src="${product.icon}" alt="${product.title}">
                            <span class="username">${product.username}</span>
                            <div class="product-price">${product.price}</div>
                        </div>                          
                    </div>
                `;
                productItem.addEventListener('click', () => {
                    window.location.href = `product_details.html?id=${product.productId}`; // Navigate to product details
                });
                productGrid.appendChild(productItem);
            });

            // Update pagination
            updatePagination(products.length);
        }

        // Function to update pagination buttons
        function updatePagination(totalProducts) {
            const totalPages = Math.ceil(totalProducts / productsPerPage);
            pagination.innerHTML = ''; // Clear current pagination buttons

            // Create "Previous" button
            const prevButton = document.createElement('button');
            prevButton.textContent = '<';
            prevButton.className = 'arrow';
            prevButton.disabled = currentPage === 1; // Disable on the first page
            prevButton.addEventListener('click', () => changePage(currentPage - 1));
            pagination.appendChild(prevButton);

            // Create page number buttons
            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement('button');
                pageButton.className = 'page';
                pageButton.textContent = i;
                if (i === currentPage) {
                    pageButton.classList.add('active');
                }
                pageButton.addEventListener('click', () => changePage(i));
                pagination.appendChild(pageButton);
            }

            // Create "Next" button
            const nextButton = document.createElement('button');
            nextButton.textContent = '>';
            nextButton.className = 'arrow';
            nextButton.disabled = currentPage === totalPages; // Disable on the last page
            nextButton.addEventListener('click', () => changePage(currentPage + 1));
            pagination.appendChild(nextButton);
        }

        // Function to change the page
        function changePage(page) {
            if (page < 1 || page > Math.ceil(products.length / productsPerPage)) return; // Ensure valid page
            currentPage = page;
            renderProducts(currentPage); // Re-render products for the new page
        }

        // Initially render products for the first page
        renderProducts(currentPage);
    });

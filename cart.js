// API URL for cart data
const apiUrl = 'http://localhost:3000/api/cart'; // Real API URL (Replace with actual if different)

// Fetch cart data from the real API
async function fetchCartData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch cart data:', error);
    return [];
  }
}

// Render Cart Items from API
async function renderCart() {
  const cartContainer = document.querySelector('.cart');
  const cartItems = await fetchCartData();

  // Clear previous cart content
  cartContainer.innerHTML = '';

  // Render each cart item dynamically
  cartItems.forEach(item => {
    const cartItemHTML = `
      <div class="cart-item" data-id="${item.id}">
        <div class="user-info">
          <img src="images/user.png" alt="User Image" class="user-image">
          <div class="item-details">
            <span class="item-name">${item.name}</span>
            <div class="promo-codes">
              <span>use code <strong>${item.promoCodes[0]}</strong> for free delivery</span>
              <span>use code <strong>${item.promoCodes[1]}</strong> for $2 off</span>
            </div>
          </div>
        </div>

        <!-- Promo Codes Available Text (Top Right) -->
        <div class="promo-codes-available">
          % Promo codes available
        </div>

        <div class="item-image-container">
          <img src="${item.image}" alt="${item.name}" class="item-image">
          <span class="brand-new-label">brand new</span>
        </div>

        <div class="item-quantity">
          <button class="decrement" data-id="${item.id}">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="increment" data-id="${item.id}">+</button>
        </div>

        <!-- Price Section -->
        <div class="item-price">S$${(item.price * item.quantity).toFixed(2)}</div>

        <!-- Remove Button -->
        <button class="remove-item" data-id="${item.id}">Remove</button>
      </div>
    `;
    cartContainer.insertAdjacentHTML('beforeend', cartItemHTML);
  });

  // Add event listeners for remove buttons
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', function(event) {
      const itemId = event.target.dataset.id;
      removeItem(itemId);
    });
  });

  updateTotal();
}

// Remove item from cart and update API
async function removeItem(itemId) {
  try {
    const response = await fetch(`http://localhost:3000/api/cart/${itemId}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    alert(data.message); // Show message after removing the item
    renderCart(); // Re-render cart after removal
  } catch (error) {
    console.error('Failed to remove item:', error);
  }
}

// Update the total amount dynamically
function updateTotal() {
  let total = 0;
  const cartItems = document.querySelectorAll('.cart-item');
  cartItems.forEach(item => {
    const price = parseFloat(item.querySelector('.item-price').textContent.replace('S$', '').replace(',', ''));
    total += price;
  });
  document.getElementById('total-price').textContent = 'S$' + total.toFixed(2);
}

// Apply promo code (for free shipping or discounts)
document.getElementById('apply-promo').addEventListener('click', function() {
  const promoCode = document.getElementById('promo-code').value.trim().toLowerCase();
  
  // Promo code logic
  if (promoCode === 'freeshipping') {
    alert('Free shipping applied!');
  } else if (promoCode === 'newuser') {
    alert('10% discount applied!');
    applyDiscount(10); // Apply 10% discount
  } else {
    alert('Invalid promo code');
  }
});

// Apply discount to total price
function applyDiscount(discountPercentage) {
  const totalElement = document.getElementById('total-price');
  let currentTotal = parseFloat(totalElement.textContent.replace('S$', ''));
  let discountedTotal = currentTotal - (currentTotal * (discountPercentage / 100));
  totalElement.textContent = `S$${discountedTotal.toFixed(2)}`;
}

// Select All functionality
document.getElementById('select-all').addEventListener('change', (event) => {
  const isSelected = event.target.checked;
  const checkboxes = document.querySelectorAll('.cart-item input[type="checkbox"]');
  checkboxes.forEach(checkbox => checkbox.checked = isSelected);
});

// Initialize the cart on page load
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
});

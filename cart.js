// Function 1: Increase or decrease the quantity of cart item
function adjustQuantity(itemId, action) {
  const quantityElement = document.querySelector(`[data-id="${itemId}"] .quantity`); // Use data-id selector

  if (quantityElement) {
    let quantity = parseInt(quantityElement.textContent);

    if (action === 'increment') {
      quantity++;
    } else if (action === 'decrement' && quantity > 1) {
      quantity--;
    }

    quantityElement.textContent = quantity; // Update the quantity in the DOM
    updateTotalPrice();                     // Recalculate the total price after adjusting quantity
  } else {
    console.error('Quantity element not found for item:', itemId);
  }
}

// Function 2: Remove a specific item from the cart when the user clicks the 'X' button
function removeItem(itemId) {
  const item = document.querySelector(`.cart-item[data-id="${itemId}"]`);

  if (item) {
    item.remove();

    // Check if the cart is empty and show the empty cart alert
    const cartItems = document.querySelectorAll('.cart-item');
    if (cartItems.length === 0) {
      document.querySelector('#empty-cart-alert').style.display = 'block';
    } else {
      document.querySelector('#empty-cart-alert').style.display = 'none';
    }

    // Recalculate the total price after the item is removed
    updateTotalPrice();
  } else {
    console.error('Item not found for removal:', itemId);
  }
}

// Function 3: Select/deselect an item when the checkbox is clicked
function toggleItemSelection(itemId) {
  updateTotalPrice();  // Recalculate the total price after selection change
}

// Function 4: Select/deselect all items in the cart when the select all checkbox is clicked
function toggleSelectAll() {
  const selectAllCheckbox = document.querySelector('#select-all');
  const itemCheckboxes = document.querySelectorAll('.item-checkbox');

  itemCheckboxes.forEach(checkbox => {
    checkbox.checked = selectAllCheckbox.checked;         // Set all checkboxes to match the 'Select All' checkbox
  });

  updateTotalPrice();  // Recalculate the total price after selecting/deselecting all items
}

// Function 5: Calculate and display the total price based on selected items and their quantities
function updateTotalPrice() {
  let total = 0;      // Initialize total as 0
  let itemCount = 0;  // Track the number of selected items

  // Calculate the total price for selected items
  document.querySelectorAll('.cart-item').forEach(item => {
    const checkbox = item.querySelector('.item-checkbox');
    const quantity = parseInt(item.querySelector('.quantity').textContent);
    if (checkbox.checked) {
      const price = parseFloat(item.querySelector('.item-price').textContent.replace('S$', ''));
      total += price * quantity;
      itemCount++;  // Increment selected item count
    }
  });

  // Update the total price display
  const totalPriceElement = document.querySelector('#total-price');
  totalPriceElement.textContent = `S$${total.toFixed(2)}`;

  // Update the count of selected items
  const selectedItemCountElement = document.querySelector('#selected-item-count');
  selectedItemCountElement.textContent = `(${itemCount} items selected)`;
}

// Function to handle successful checkout message
function showCheckoutMessage() {
  const checkoutMessage = document.createElement('div');
  checkoutMessage.classList.add('checkout-message');
  checkoutMessage.innerHTML = '<h3>Successfully Checked Out!</h3>';
  document.body.appendChild(checkoutMessage);

  // Hide the checkout modal after a delay
  setTimeout(() => {
    closeModal(); // Hide the modal
    checkoutMessage.style.display = 'none'; // Hide the success message after 3 seconds
  }, 2000);
}

// Function to close the modal when the close button is clicked
function closeModal() {
  const modal = document.getElementById('checkout-modal');
  if (modal) {
    modal.style.display = 'none';  // Hide the modal
  } else {
    console.error('Modal element not found');
  }
}

// Ensure that the DOM content is fully loaded before adding event listeners
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('checkout-modal');
  const closeButton = document.getElementById('close-modal');

  // Debug logs to check if modal and close button are found
  console.log(modal);  // Ensure modal element is found
  console.log(closeButton);  // Ensure close button is found

  // Check if both modal and close button exist before adding event listener
  if (modal && closeButton) {
    closeButton.addEventListener('click', () => {
      // Hide the modal
      modal.style.display = 'none';
    });

    // Ensure clicking outside the modal content closes the modal
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none'; // Close modal when clicked outside
      }
    });
  } else {
    console.error('Modal or Close button not found!');
  }

  // Event listener for the checkout button to show the modal
  const checkoutButton = document.querySelector('#checkout-btn');
  if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
      if (modal) {
        modal.style.display = 'flex';  // Show the modal
      }
    });
  }

  // Add event listeners for cart interactions like increment/decrement, remove items, etc.
  document.querySelectorAll('.increment').forEach(button => {
    button.addEventListener('click', (e) => {
      const itemId = e.target.closest('.cart-item').dataset.id;
      adjustQuantity(itemId, 'increment');
    });
  });

  document.querySelectorAll('.decrement').forEach(button => {
    button.addEventListener('click', (e) => {
      const itemId = e.target.closest('.cart-item').dataset.id;
      adjustQuantity(itemId, 'decrement');
    });
  });

  // Add event listeners for remove item buttons
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', (e) => {
      const itemId = e.target.dataset.id;
      removeItem(itemId);
    });
  });

  // Add event listener for select item checkboxes
  document.querySelectorAll('.item-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const itemId = e.target.id.replace('select-item-', '');
      toggleItemSelection(itemId);
    });
  });

  // Add event listener for select/deselect all checkbox
  document.querySelector('#select-all').addEventListener('change', toggleSelectAll);
});

// Function 6: Checkout (shows the modal)
function checkout() {
  const modal = document.getElementById('checkout-modal');
  if (modal) {
    modal.style.display = 'flex';    // Show the modal using 'flex'
  } else {
    console.error('Modal element not found');
  }
}

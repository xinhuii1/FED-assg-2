
// NOTE FUNCTIONS LEFT:
// display empty cart message
// api (link transaction history)
// increment and decrement not working
// active count cart items update
// individual checkbox not working
// checkout to be done
// tbc 

// function 1: increase or decrease the quantity of cart item
function adjustQuantity(itemId, action) {
  const quantityElement = document.querySelector(`#cart-item-${itemId} .quantity`);
  let quantity = parseInt(quantityElement.textContent);

  if (action === 'increment') {
    quantity++;
  } else if (action === 'decrement' && quantity > 1) {
    quantity--;
  }

  quantityElement.textContent = quantity;
  updateTotalPrice();  // update the total price after selecting the quantity
}


// function 2: remove a specific item from the cart when the user clicks the 'X' button
function removeItem(itemId) {
  const item = document.querySelector(`.cart-item[data-id="${itemId}"]`);
  item.remove();

  // check if the cart is empty 
  if (document.querySelectorAll('.cart-item').Length ===0) {
    document.querySelector('#empty-cart-alert').style.display = 'block'
  }
  updateTotalPrice();  // update the total price after user chooses to remove the item
}


// function 3: select/deselect an item when the checkbox is clicked
function toggleItemSelection(itemId) {
  const checkbox = document.querySelector(`#select-item-${itemId}`);
  checkbox.checked = !checkbox.checked;
  updateTotalPrice();  // update the total price after selecting/deselecting items
}

// function 4: select/deselect all items in the cart when the select all checkbox is clicked
function toggleSelectAll() {
  const selectAllCheckbox = document.querySelector('#select-all');
  const itemCheckboxes = document.querySelectorAll('.item-checkbox');

  itemCheckboxes.forEach(checkbox => {
    checkbox.checked = selectAllCheckbox.checked;
  });

  updateTotalPrice();  // update the total price after selecting/deselecting all items
}

// function 5: calculate and display the total price based on selected items and their quantities
function updateTotalPrice() {
  let total = 0;  // initialize total as 0

  // calculate the total price for selected items
  document.querySelectorAll('.cart-item').forEach(item => {
    const checkbox = item.querySelector('.item-checkbox');
    if (checkbox.checked) {
      const price = parseFloat(item.querySelector('.item-price').textContent.replace('S$', ''));
      const quantity = parseInt(item.querySelector('.quantity').textContent);
      total += price * quantity;
    }
  });
  

  // update the total price display
  const totalPriceElement = document.querySelector('#total-price');
  totalPriceElement.textContent = `S$${total.toFixed(2)}`;
}

 // function 6: checkout
 function checkout() {
  alert('Proceeding to checkout...');

}

document.addEventListener('DOMContentLoaded', () => {
  // Event listeners for increment and decrement buttons
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

  // Event listeners for remove buttons
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', (e) => {
      const itemId = e.target.dataset.id;
      removeItem(itemId);
    });
  });

  // Event listener for select/deselect item
  document.querySelectorAll('.item-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const itemId = e.target.id.replace('select-item-', '');
      toggleItemSelection(itemId);
    });
  });

  // Event listener for select/deselect all checkbox
  document.querySelector('#select-all').addEventListener('change', toggleSelectAll);

  // Event listener for checkout button
  document.querySelector('#checkout-btn').addEventListener('click', checkout);
});

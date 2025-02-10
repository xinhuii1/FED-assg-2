// Function to open the Offer Modal
function openOfferForm() {
    document.getElementById("offer-modal").style.display = "block"; // Display the modal
}

// Function to close the Offer Modal
function closeOfferForm() {
    document.getElementById("offer-modal").style.display = "none"; // Hide the modal
}

// Function to start typing (show "typing..." indicator)
function startTyping() {
    document.getElementById('typing-indicator').style.display = 'block';  // Show typing indicator
}

// Function to stop typing (hide "typing..." indicator)
function stopTyping() {
    document.getElementById('typing-indicator').style.display = 'none';  // Hide typing indicator
}

// Function to send a new message from one user to another
function sendMessage(userFrom, userTo, messageContent) {
    const data = {
        user_from: userFrom,
        user_to: userTo,
        message: messageContent,
        timestamp: new Date().toISOString(),
        status: "unread"  // Initially, mark the message as "unread"
    };

    fetch('https://mokesell-0891.restdb.io/rest/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': '67a4eec1fd5d5864f9efe119',
            'cache-control': 'no-cache'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Message sent:', data); 
        updateChatWindow(data); // Optionally update the chat window here
    })
    .catch((error) => {
        console.error('Error sending message:', error);
    });
}

// Function to submit an offer for a product
function submitOffer() {
    const offerPrice = document.getElementById('offer-price').value; // Get the offer price from the input field
    const buyerId = 'user123';  // Replace with the actual buyer's ID
    const productId = 'product789';  // Replace with the actual product's ID

    const data = {
        buyer_id: buyerId,  // Correct field for buyer ID
        product_id: productId,  // Correct field for product ID
        offer_price: offerPrice,  // Correct field for offer price
        status: "pending"  // The status is initially set as pending
    };

    fetch('https://mokesell-0891.restdb.io/rest/offer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': '67a4eec1fd5d5864f9efe119',
            'cache-control': 'no-cache'
        },
        body: JSON.stringify(data) // Correct JSON structure
    })
    .then(response => response.json())
    .then(data => {
        console.log('Offer submitted:', data);
        console.log('Validation errors:', data.list); // Inspect the validation errors in the response
        closeOfferForm(); // Close the offer modal after submission
    })
    .catch((error) => {
        console.error('Error submitting offer:', error);
    });
}

// Function to submit a review from a buyer to a seller
function submitReview(buyerId, sellerId, rating, reviewMessage) {
    // Prepare the review data
    const data = {
        buyer_id: buyerId,  // ID of the buyer submitting the review
        seller_id: sellerId,  // ID of the seller being reviewed
        rating: rating,  // Rating (e.g., 1-5 scale)
        review_message: reviewMessage,  // The review content from the buyer
        timestamp: new Date().toISOString()  // Timestamp when the review was submitted
    };

    // Send the review data to RESTdb using a POST request
    fetch('https://mokesell-0891.restdb.io/rest/review', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Specify the content type as JSON
            'x-apikey': '67a4eec1fd5d5864f9efe119',  // Your API Key
            'cache-control': 'no-cache'  // Avoid caching the request
        },
        body: JSON.stringify(data)      // Convert the review data to a JSON string
    })
    .then(response => response.json())  // Parse the response as JSON
    .then(data => {
        console.log('Review submitted:', data); // Log the submitted review data
        // Optionally, you can show a success message or update the UI
    })
    .catch((error) => {
        console.error('Error submitting review:', error); // Handle any errors during the request
    });
}

// Function to update the chat window with the new message
function updateChatWindow(messageData) {
    const chatBody = document.querySelector('.chat-body');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', messageData.status === 'unread' ? 'received' : 'sent');
    messageDiv.innerHTML = `
        <p>${messageData.message}</p>
        <span class="timestamp">${new Date(messageData.timestamp).toLocaleTimeString()}</span>
    `;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight; // Scroll to the bottom of the chat
}

// Function to display typing indicator in the chat window
function toggleTypingIndicator(isTyping) {
    const typingIndicator = document.getElementById('typing-indicator');
    typingIndicator.style.display = isTyping ? 'block' : 'none';
}

// Event listener for message input (to show typing indicator)
document.getElementById('message-input').addEventListener('input', () => {
    startTyping();
    setTimeout(() => stopTyping(), 2000);  // Stop typing indicator after 2 seconds
});


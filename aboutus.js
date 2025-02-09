// Open the feedback modal
function openFeedbackModal() {
    document.getElementById('feedback-modal').style.display = 'flex';
}

// Close the feedback modal
function closeFeedbackModal() {
    document.getElementById('feedback-modal').style.display = 'none';
}

// Handle feedback submission
document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const feedbackData = {
        user_id: "12345", // Replace this with actual user ID from session or authentication system
        category: document.getElementById('category').value,
        feedback_message: document.getElementById('feedback').value,
        timestamp: new Date().toISOString(), // Current timestamp
        status: 'open', // Initially open, can be updated later
        assigned_to: "" // Leave empty, to be filled later
    };

    // Automatically assign support staff using round-robin logic
    const staff = ["support1", "support2", "support3"];  // Example support staff IDs
    let assignedTo = staff[Math.floor(Math.random() * staff.length)];  // Randomly assign
    feedbackData.assigned_to = assignedTo;

    // Log the feedback data to check if it's correct
    console.log('Submitting feedback:', feedbackData);

    // Send the feedback data to RestDB using Fetch API
    fetch('https://mokesell-0891.restdb.io/rest/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': '67a4eec1fd5d5864f9efe119',
            'cache-control': 'no-cache'
        },
        body: JSON.stringify(feedbackData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Feedback submitted successfully:', data);
        alert('Thank you for your feedback!');
        closeFeedbackModal(); // Close the modal after submission
    })
    .catch((error) => {
        console.error('Error submitting feedback:', error);
        alert('An error occurred. Please try again later.');
    });
});

// Function to resolve the feedback (mark it as resolved and ask for a rating)
function resolveFeedback(feedbackId) {
    // Change the feedback status to "resolved"
    fetch(`https://mokesell-0891.restdb.io/rest/feedback/${feedbackId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': '67a4eec1fd5d5864f9efe119',
            'cache-control': 'no-cache'
        },
        body: JSON.stringify({ status: 'resolved' })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Feedback resolved:', data);
        // Now ask the user to rate the support
        const resolvedRating = prompt('Please rate the support staff (1-5):');
        if (resolvedRating >= 1 && resolvedRating <= 5) {
            updateFeedbackRating(feedbackId, resolvedRating);
        } else {
            alert('Invalid rating. Please enter a number between 1 and 5.');
        }
    })
    .catch((error) => {
        console.error('Error resolving feedback:', error);
        alert('An error occurred while resolving the feedback.');
    });
}

// Update feedback rating and status
function updateFeedbackRating(feedbackId, rating) {
    fetch(`https://mokesell-0891.restdb.io/rest/feedback/${feedbackId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': '67a4eec1fd5d5864f9efe119',
            'cache-control': 'no-cache'
        },
        body: JSON.stringify({ rating: rating, status: 'resolved' })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Feedback resolved and rating updated:', data);
        alert('Feedback resolved! Rating updated.');
    })
    .catch((error) => {
        console.error('Error updating feedback rating:', error);
        alert('An error occurred while updating the rating.');
    });
}

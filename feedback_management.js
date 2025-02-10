// Fetch all feedback data from RestDB
function fetchFeedbackData() {
    // Sending GET request to fetch feedback data from the RestDB API
    fetch('https://mokesell-0891.restdb.io/rest/feedback', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': '67a4eec1fd5d5864f9efe119', 
        }
    })
    .then(response => response.json())  // Parse the JSON response
    .then(data => {
        console.log('Fetched feedback data:', data);  // Log the fetched data for verification
        displayFeedback(data);                        // Call the displayFeedback function to populate the table
    })
    .catch((error) => {
        console.error('Error fetching feedback data:', error);
        alert('An error occurred while fetching feedback.');  // Alert if there's an issue fetching data
    });
}

// Display feedback data in the table
function displayFeedback(feedbacks) {
    const tableBody = document.querySelector('#feedback-table tbody');  // Get the table body element
    tableBody.innerHTML = '';                                           // Clear the table before adding new data

    // Loop through each feedback item and create a table row
    feedbacks.forEach(feedback => {
        const row = document.createElement('tr');  // Create a new row

        // Insert the feedback data into the table row
        row.innerHTML = `
            <td>${feedback.user_id}</td>
            <td>${feedback.category}</td>
            <td>${feedback.feedback_message}</td>
            <td>${feedback.status}</td>
            <td>${feedback.assigned_to || 'Not Assigned'}</td>
            <td>${feedback.rating || 'N/A'}</td>
            <td>
                <button onclick="resolveFeedback('${feedback._id}')">Resolve</button>
                <button onclick="assignStaff('${feedback._id}')">Assign Staff</button>
            </td>
        `;

        // Append the newly created row to the table body
        tableBody.appendChild(row);
    });
}

// Assign staff to the feedback
function assignStaff(feedbackId) {
    // Define the available staff IDs
    const staff = ["support1", "support2", "support3"];  // Example staff IDs
    // Show a prompt to the admin asking which staff to assign
    const assignedTo = prompt('Assign this feedback to support staff (choose 1, 2, or 3):\n1. support1\n2. support2\n3. support3');

    // Validate if the input staff ID exists in the staff list
    if (staff.includes(assignedTo)) {
        updateFeedbackAssignment(feedbackId, assignedTo);                               // Update the feedback assignment
    } else {
        alert('Invalid staff ID. Please choose a valid staff member from the list.');  // Alert if the ID is invalid
    }
}

// Update the assignment in RestDB
function updateFeedbackAssignment(feedbackId, assignedTo) {
    // Send PATCH request to update the assigned staff for the feedback
    fetch(`https://mokesell-0891.restdb.io/rest/feedback/${feedbackId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': '67a4eec1fd5d5864f9efe119',         
            'cache-control': 'no-cache'
        },
        body: JSON.stringify({ assigned_to: assignedTo })  // Send the updated staff assignment
    })
    .then(response => response.json())                    // Parse the JSON response
    .then(data => {
        console.log('Feedback assigned:', data);  // Log the result
        alert('Feedback assigned successfully!');  // Notify the admin
        fetchFeedbackData();                        // Refresh the table to reflect the change
    })
    .catch((error) => {
        console.error('Error assigning feedback:', error);
        alert('An error occurred while assigning the staff.');  // Alert if there's an issue with assignment
    });
}

// Resolve the feedback (mark it as resolved and ask for a rating)
function resolveFeedback(feedbackId) {
    // Prompt the user to rate the support (after resolution)
    const resolvedRating = prompt('Please rate the support staff (1-5):');
    if (resolvedRating >= 1 && resolvedRating <= 5) {
        updateFeedbackRating(feedbackId, resolvedRating);  // Update the feedback with the rating
    } else {
        alert('Invalid rating. Please enter a number between 1 and 5.');  // Alert if the rating is invalid
    }
}

// Update feedback rating and status using CORS proxy
function updateFeedbackRating(feedbackId, rating) {
    // Send PATCH request to update the rating and status of the feedback using CORS proxy
    fetch('https://cors-anywhere.herokuapp.com/https://mokesell-0891.restdb.io/rest/feedback/' + feedbackId, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': '67a4eec1fd5d5864f9efe119',  
            'cache-control': 'no-cache'
        },
        body: JSON.stringify({ rating: rating, status: 'resolved' })  // Update the feedback with rating and status
    })
    .then(response => response.json())  // Parse the JSON response
    .then(data => {
        console.log('Feedback resolved and rating updated:', data);  // Log the result
        alert('Feedback resolved! Rating updated.');  // Notify the admin
        fetchFeedbackData();  // Refresh the table to reflect the change
    })
    .catch((error) => {
        console.error('Error resolving feedback:', error);
        alert('An error occurred while resolving the feedback.');  // Alert if there's an issue with resolution
    });
}


# FED-assg-2

# https://github.com/xinhuii1/FED-assg-2.git #github link

# MokeSell - Interactive Web Application

## Project Overview

MokeSell is an **interactive online marketplace** designed for buying and selling both **new and second-hand goods**. It allows users to create accounts, list products, browse and search for items, and communicate directly with other users via chat. Key features include user profile management, product listing creation and management, a shopping cart system, reviews, and feedback systems. With a focus on ease of use, MokeSell is designed to ensure that both buyers and sellers can engage in seamless transactions while building trust within the platform.

---

## External User Goal

MokeSell caters to users who are looking for a **simple, reliable, and secure online marketplace** to buy and sell products. The platform’s goal is to:
- **Allow buyers to easily search, browse, and purchase products** from multiple categories.
- **Enable sellers to create, manage, and promote their product listings**, ensuring visibility to potential buyers.
- **Offer smooth communication** between buyers and sellers through integrated chat functionality.
- **Provide trust-building features** such as reviews, ratings, and a transparent feedback system.
- **Support feedback submission and rating of support staff** for better service quality.

---

## Internal Goal

The internal goal for MokeSell is to build a **robust and scalable web application** that meets the following objectives:
- **Create an intuitive platform** that ensures ease of use and navigation for both buyers and sellers.
- **Ensure seamless backend integration** for managing users, product listings, and transactions.
- **Handle large amounts of data** (e.g., products, reviews, user interactions) through a **reliable database**.
- **Ensure the security of user data** by implementing secure authentication and password management practices.
- **Provide a feedback loop** that allows users to rate their experience with sellers and the platform to ensure continuous improvement.
  
---

## Design Idea

MokeSell’s design is built with simplicity, clarity, and user-centric navigation at the forefront. Key design principles include:
- **Minimalist Aesthetic**: The design uses soft neutral tones (e.g., whites, light grays, and beiges) to create a clean and distraction-free experience for users.
- **Responsive and Functional Layouts**: Although not explicitly mobile-responsive, the site is designed to **optimize user experience** on desktop platforms with a clean, grid-based layout for product listings.
- **Typography**: A mix of **serif** and **sans-serif fonts** is used to enhance readability. Bold fonts are used for headings, ensuring a clear visual hierarchy, while body text is set in regular weights to maintain clarity and ease of reading.
- **Interactive Features**: Subtle hover effects are applied to buttons and links, offering immediate feedback for user interaction. This enhances the usability and feel of the platform.
- **Trust-Building Visuals**: Clear product images, professional-looking layout, and consistent color schemes are designed to enhance the feeling of trust and professionalism throughout the platform.

---

## Features Implemented

### 1. **User Account Management**
- **Sign Up**: 
    - Users can create an account by providing a **username**, **email address**, **phone number**, and **password**.
    - The system validates email formats and checks for secure passwords to ensure the safety of user data.
    - After successful registration, the user is redirected to their profile page or dashboard.
    
- **Login**:
    - Registered users can log in securely.
    - The system checks if the credentials (email and password) match any records in the database.
    - Upon successful login, users are redirected to the homepage.

- **Profile Management**:
    - Users can **update their profile** with new information like username, email, profile pictures, and other details.
    - The profile also shows the user’s transaction history and feedback ratings.
    
- **Security**:
    - Passwords are handled securely using encryption techniques, ensuring the protection of user data.

---

### 2. **Product Listing Management**
- **Create Product Listings**:
    - Sellers can **add new listings** by entering product details such as **title**, **price**, **category**, **description**, and **images**.
    - Listings include vital information like **product condition (new/used)** and **shipping options**.
    
- **Listing Expiry**:
    - All listings **automatically expire after 30 days** and are marked as inactive after this period to maintain up-to-date product visibility.

- **Active Listings Limit**:
    - Sellers can have **up to 30 active listings**. If a seller reaches this limit, they must either delete or mark existing listings as inactive to add new ones.

- **Listing Bump Feature**:
    - Sellers can **promote their listings** by purchasing "bump" options. This allows them to increase the visibility of their product listings by boosting their rank on the marketplace.

---

### 3. **Search and Browsing**
- **Product Search**:
    - A **search bar** is available for users to search for specific items by entering keywords. The results are dynamically updated as the user types.
    
- **Category Browsing**:
    - Although full category-based browsing isn't implemented yet, the infrastructure is set up to allow future expansion, enabling users to browse products by **category** or **subcategory**.
    
- **Saved Listings**:
    - Buyers can save product listings for later review by **liking** them, making it easy to track desired products.

---

### 4. **Communication and Transaction Process**
- **Chat Feature**:
    - Buyers and sellers can **communicate via an integrated chat system**. This allows them to discuss product details, payment methods, shipping, and other transaction specifics.
    
- **Offer Submission**:
    - Buyers can **submit offers** on products. The seller can then choose to accept, reject, or counter the offer based on their terms.

---

### 5. **Review and Feedback System**
- **User Reviews**:
    - After a successful transaction, both **buyers and sellers can leave reviews** for each other.
    - Reviews help build a **reputation** within the platform. Ratings range from 1 to 5 stars, and users can leave comments on their experience.

- **Platform Feedback**:
    - Users can **submit feedback** about the platform. This feedback can be categorized into different areas (e.g., "technical issues," "suggestions," etc.), and the feedback is assigned to support staff for resolution.

- **Support Staff Rating**:
    - After the resolution of feedback, users can **rate the support team’s performance**, providing transparency in customer service.

---

### 6. **Cart Feature**
- **Shopping Cart**:
    - Buyers can **add items to their shopping cart** for later checkout. The cart shows a summary of the products selected, their prices, and total costs.
    
- **Cart Management**:
    - Buyers can manage the items in their cart, such as **removing products** or **adjusting quantities**, before proceeding to checkout.

---

## Technologies Used

- **Frontend**:
  - **HTML5**: Used to structure the content and form elements across the application.
  - **CSS3**: For layout design, styling, and animations.
  - **JavaScript**: Handles interactivity such as form validation, dynamic content updates, and API integration.
  - **FontAwesome**: Used for icons across the site for buttons, links, and other interactive elements.
  
- **Backend/API**:
  - **RestDB**: A cloud-based database that stores product listings, user profiles, transactions, and feedback. This backend integrates seamlessly with the frontend for real-time data updates.
  
- **Animations**:
  - Custom hover effects for buttons, smooth scrolling between sections, and modal animations for improved user experience.

---



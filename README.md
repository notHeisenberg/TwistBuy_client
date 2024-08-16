# TwistBuy

This repository contains the frontend code for the TwistBuy eCommerce platform. It is built using React.js and Tailwind CSS.

## Features

- **Dynamic Product Listing:** Display products with pagination, sorting, and filtering options.
- **Search Functionality:** Search for products by name with real-time results.
- **Filter Options:** Filter products by category, brand, and price range.
- **Sorting Options:** Sort products by price (low to high, high to low) and date added.
- **Shopping Cart:** Add and remove products from the cart with persistent storage.
- **Responsive Design:** Fully responsive layout optimized for various device sizes.
- **Tooltip for Cart Actions:** Hover over cart items to see tooltips for removal actions.
- **Private Routes:** Protect routes and ensure secure access to user-specific pages like the cart.

## Prerequisites

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (Version 16.x or later)
- [Git](https://git-scm.com/)

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/twistbuy-frontend.git
   cd twistbuy-frontend
   npm install```
2. **Create Environment Variables**
   ```bash REACT_APP_API_URL=http://localhost:5000
   Replace http://localhost:5000 with the URL of your backend server if different.

Build Tailwind CSS

Ensure you have Tailwind CSS installed and configured. If not, follow the Tailwind CSS Installation Guide.

   ```bash npm run dev`
The application will run on http://localhost:3000.

## Additional Notes
Ensure that the backend server is running and accessible at the URL specified in the .env file.

For a production build, use the command:
```bash npm run build`
This will create a build directory with the production-ready files.

For deployment, you can use platforms such as Netlify or Vercel.

# Contributing

If you'd like to contribute:

- Fork the repository.
- Create a new branch (git checkout -b feature/YourFeature).
- Make your changes and commit (git commit -am 'Add new feature').
- Push to the branch (git push origin feature/YourFeature).
- Open a Pull Request on GitHub.


Feel free to adjust the details as needed to match your project's specifics.

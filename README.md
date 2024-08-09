# Bidding Engine Backend

## Overview

This is the backend for the Bidding Engine, built with Node.js, Express, and MongoDB. It provides APIs for creating bids, inviting bidders, placing bids, and managing the bidding process.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/bidding-engine-backend.git
    cd bidding-engine-backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```plaintext
    MONGO_URI=your_mongodb_connection_string
    PORT=5000
    ```

4. Start the server:
    ```bash
    npm start
    ```

The backend server should now be running on `http://localhost:5000`.

## API Endpoints

### 1. Create a Bid
- **Endpoint:** `POST /api/bids`
- **Description:** Create a new bid.
- **Body Example:**
    ```json
    {
      "title": "Sample Bid",
      "items": [
        { "description": "Item 1" },
        { "description": "Item 2" }
      ],
      "creator": "creator_id_here",
      "startTime": "2024-08-08T00:00:00.000Z",
      "endTime": "2024-08-09T00:00:00.000Z"
    }
    ```

### 2. Publish a Bid
- **Endpoint:** `PUT /api/bids/:id/publish`
- **Description:** Publish a bid by its ID.

### 3. Invite Bidders
- **Endpoint:** `PUT /api/bids/:id/invite`
- **Description:** Invite bidders to a specific bid.
- **Body Example:**
    ```json
    {
      "bidders": ["bidder_id_here"]
    }
    ```

### 4. Place a Bid
- **Endpoint:** `PUT /api/bids/:id/place`
- **Description:** Place a bid on an item.
- **Body Example:**
    ```json
    {
      "itemId": "item_id_here",
      "amount": 100
    }
    ```

### 5. Get All Bids
- **Endpoint:** `GET /api/bids`
- **Description:** Retrieve all bids.

## Testing

You can test the API endpoints using Postman or any other API client.

## License

This project is licensed under the MIT License.


# Bidding Engine Frontend

## Overview

This is the frontend for the Bidding Engine, built with React.js and Tailwind CSS. It provides a user interface for creating bids, inviting bidders, placing bids, and viewing bidding results.

## Prerequisites

- Node.js (v14 or higher)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/bidding-engine-frontend.git
    cd bidding-engine-frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

The frontend should now be running on `http://localhost:3000`.

## Project Structure

- **components**: Contains React components such as `CreateBid.js`, `InviteBidders.js`, `PlaceBid.js`, and `ViewBids.js`.
- **App.js**: Main application file that includes routing to different components.
- **index.js**: Entry point of the React application.

## Available Components

### 1. CreateBid.js
- **Description**: Allows the user to create a new bid by entering a title, items, and time period.

### 2. InviteBidders.js
- **Description**: Allows the user to invite bidders to a specific bid by entering their IDs.

### 3. PlaceBid.js
- **Description**: Allows a bidder to place a bid on a specific item within a bid.

### 4. ViewBids.js
- **Description**: Displays all bids and the highest bid amounts for each item.

## Navbar

A simple navigation bar allows you to switch between creating bids, inviting bidders, placing bids, and viewing bids.

## Tailwind CSS

The frontend uses Tailwind CSS for styling. You can customize the styles by editing the `tailwind.config.js` file.

## License

This project is licensed under the MIT License.

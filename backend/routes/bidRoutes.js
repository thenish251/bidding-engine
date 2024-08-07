const express = require('express');
const bidController = require('../controllers/bidController');

const router = express.Router();

router.post('/bids', bidController.createBid);
router.get('/bids', bidController.getBids);
router.get('/bids/:id', bidController.getBidById);
router.put('/bids/:id/publish', bidController.updateBid);
router.delete('/bids/:id', bidController.deleteBid);

// Define the invite route
router.put('/bids/:id/invite', bidController.inviteBidders);
// Define the respond route
router.put('/bids/:id/respond', bidController.respondToBid);
// Route for placing a bid amount
router.put('/bids/:id/place', bidController.placeBidAmount);

module.exports = router;

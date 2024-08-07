const Bid = require('../models/Bid');
const User = require('../models/User');
const mongoose = require('mongoose');

exports.createBid = async (req, res) => {
  try {
    const bid = new Bid(req.body);
    await bid.save();
    res.status(201).json(bid);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBids = async (req, res) => {
  try {
    const bids = await Bid.find().populate('creator').populate('bidders');
    res.status(200).json(bids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBid = async (req, res) => {
    try {
        const bidId = req.params.id;
        const bid = await Bid.findById(bidId);

        if (!bid) {
            return res.status(404).json({ message: 'Bid not found' });
        }

        bid.published = true;
        await bid.save();

        res.status(200).json({ message: 'Bid published successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.inviteBidders = async (req, res) => {
    try {
        const bidId = req.params.id;
        const { bidders } = req.body;
        
        // Find the bid by ID
        const bid = await Bid.findById(bidId);
        if (!bid) {
            return res.status(404).json({ message: 'Bid not found' });
        }

        // Validate if all bidders exist
        const validBidders = await User.find({ '_id': { $in: bidders } });
        if (validBidders.length !== bidders.length) {
            return res.status(400).json({ message: 'One or more bidders do not exist' });
        }

        // Add bidders to the bid if they are not already added
        validBidders.forEach(bidder => {
            if (!bid.bidders.includes(bidder._id)) {
                bid.bidders.push(bidder._id);
            }
        });

        // Save the bid
        await bid.save();

        res.status(200).json({ message: 'Bidders invited successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.respondToBid = async (req, res) => {
    try {
        const bidId = req.params.id;
        const { bidderId, response } = req.body;

        // Validate response
        if (!['accept', 'reject'].includes(response)) {
            return res.status(400).json({ message: 'Invalid response' });
        }

        // Check if bidId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(bidId)) {
            return res.status(400).json({ message: 'Invalid bid ID' });
        }

        // Find the bid
        const bid = await Bid.findById(bidId);
        if (!bid) {
            return res.status(404).json({ message: 'Bid not found' });
        }

        // Check if the bidder is invited
        if (!bid.bidders.includes(bidderId)) {
            return res.status(400).json({ message: 'Bidder not invited to this bid' });
        }

        // Update the bidder's response
        const bidderResponse = bid.bidderResponses.find(br => br.bidderId.toString() === bidderId);
        if (bidderResponse) {
            bidderResponse.response = response;
        } else {
            bid.bidderResponses.push({ bidderId, response });
        }

        await bid.save();

        res.status(200).json({ message: `Bid request ${response}ed successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.placeBidAmount = async (req, res) => {
    try {
        const bidId = req.params.id;
        const { bidderId, itemId, amount } = req.body;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(bidId)) {
            return res.status(400).json({ message: 'Invalid bid ID' });
        }
        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(400).json({ message: 'Invalid item ID' });
        }

        // Find the bid
        const bid = await Bid.findById(bidId);
        if (!bid) {
            return res.status(404).json({ message: 'Bid not found' });
        }

        // Find the item
        const item = bid.items.id(itemId);
        if (!item) {
            console.log(`Item with ID ${itemId} not found in bid ${bidId}`);
            return res.status(404).json({ message: 'Item not found' });
        }

        // Place the bid amount
        item.amount = amount;
        await bid.save();

        res.status(200).json({ message: 'Bid amount placed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.deleteBid = async (req, res) => {
  try {
    await Bid.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Bid deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBidById = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id).populate('creator').populate('bidders');
    res.status(200).json(bid);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

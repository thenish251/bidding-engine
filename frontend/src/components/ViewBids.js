import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ViewBids() {
  const { bidId } = useParams();
  const [bid, setBid] = useState(null);

  useEffect(() => {
    const fetchBid = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/bids/${bidId}`);
        setBid(response.data);
      } catch (error) {
        console.error('Error fetching bid:', error);
      }
    };

    fetchBid();
  }, [bidId]);

  const findHighestBidder = () => {
    if (!bid || !bid.items) return null;

    let highestBidder = null;
    let highestAmount = -1;

    bid.items.forEach(item => {
      if (item.amount > highestAmount) {
        highestAmount = item.amount;
        highestBidder = item.bidder;
      }
    });

    return highestBidder ? { highestBidder, highestAmount } : null;
  };

  const highestBid = findHighestBidder();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Bid Details</h2>
      {bid ? (
        <div>
          <h3 className="text-lg font-bold mb-2">{bid.title}</h3>
          <ul className="mb-4">
            {bid.items.map(item => (
              <li key={item._id} className="mb-2">
                <span className="font-bold">Item:</span> {item.description} - <span className="font-bold">Amount:</span> ${item.amount} - <span className="font-bold">Bidder ID:</span> {item.bidder}
              </li>
            ))}
          </ul>
          {highestBid ? (
            <div>
              <h4 className="text-lg font-bold">Highest Bid:</h4>
              <p>
                Bidder ID: {highestBid.highestBidder} - Amount: ${highestBid.highestAmount}
              </p>
            </div>
          ) : (
            <p>No bids yet.</p>
          )}
        </div>
      ) : (
        <p>Loading bid details...</p>
      )}
    </div>
  );
}

export default ViewBids;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewBids = () => {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bids');
        setBids(response.data);
      } catch (error) {
        console.error('Error fetching bids:', error);
      }
    };
    fetchBids();
  }, []);

  return (
    <div>
      <h1 className="text-2xl mb-4">View Bids</h1>
      {bids.map(bid => (
        <div key={bid._id} className="border p-4 mb-4">
          <h2 className="text-xl mb-2">Title: {bid.title}</h2>
          <ul>
            {bid.items.map(item => {
              const itemBids = bid.bidders
                .filter(bidder => bidder.itemId === item._id)
                .sort((a, b) => b.amount - a.amount);
              const highestBid = itemBids.length > 0 ? itemBids[0] : null;

              return (
                <li key={item._id} className="border p-2 mb-2">
                  <p>Item: {item.description}</p>
                  <p>Highest Bidder: {highestBid ? `${highestBid.userId} - $${highestBid.amount}` : 'No bids yet'}</p>
                  <ul>
                    {itemBids.map(bidderBid => (
                      <li key={bidderBid._id} className="border p-2 mb-2">
                        <p>Bidder: {bidderBid.userId}</p>
                        <p>Amount: ${bidderBid.amount}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ViewBids;

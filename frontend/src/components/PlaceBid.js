import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlaceBid = () => {
  const [bidId, setBidId] = useState('');
  const [bid, setBid] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(''); 
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const fetchBidDetails = async () => {
      if (bidId) {
        try {
          const response = await axios.get(`http://localhost:5000/api/bids/${bidId}`);
          setBid(response.data);
        } catch (error) {
          console.error('Error fetching bid details:', error);
        }
      }
    };

    fetchBidDetails();
  }, [bidId]);

  const handleSubmit = async () => {
    if (!selectedItemId || !amount) {
      alert('Please select an item and enter a bid amount.');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/bids/${bidId}/place`, { itemId: selectedItemId, amount });
      alert('Bid placed successfully');
    } catch (error) {
      console.error('Error placing bid:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl mb-4">Place Bid</h1>
      <input
        type="text"
        className="border p-2 mb-4 w-full"
        placeholder="Bid ID"
        value={bidId}
        onChange={(e) => setBidId(e.target.value)}
      />
      {bid && (
        <div>
          <h2 className="text-xl mb-2">Title: {bid.title}</h2>
          <p className="mb-4">Description: {bid.description}</p>
          <ul>
            {bid.items.map(item => (
              <li key={item._id} className="border p-2 mb-2">
                <p>Item: {item.description}</p>
                <input
                  type="radio"
                  name="selectedItem"
                  value={item._id}
                  onChange={(e) => setSelectedItemId(e.target.value)}
                />
                <label className="ml-2">Select this item</label>
              </li>
            ))}
          </ul>
          <input
            type="number"
            className="border p-2 mb-4 w-full"
            placeholder="Bid Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            className="bg-green-500 text-white px-4 py-2"
            onClick={handleSubmit}
          >
            Place Bid
          </button>
        </div>
      )}
    </div>
  );
};

export default PlaceBid;

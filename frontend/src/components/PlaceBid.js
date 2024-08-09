import React, { useState } from 'react';
import axios from 'axios';

function PlaceBid() {
  const [bidId, setBidId] = useState('');
  const [itemId, setItemId] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/bids/${bidId}/place`, {
        itemId,
        amount,
      });
      console.log('Bid placed:', response.data);
      alert('Bid placed successfully');
    } catch (error) {
      console.error('Error placing bid:', error);
      alert('Error placing bid');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Place a Bid</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Bid ID:</label>
          <input
            type="text"
            className="border rounded w-full py-2 px-3"
            value={bidId}
            onChange={(e) => setBidId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Item ID:</label>
          <input
            type="text"
            className="border rounded w-full py-2 px-3"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Bid Amount:</label>
          <input
            type="number"
            className="border rounded w-full py-2 px-3"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Place Bid
        </button>
      </form>
    </div>
  );
}

export default PlaceBid;

import React, { useState } from 'react';
import axios from 'axios';

function InviteBidders() {
  const [bidId, setBidId] = useState('');
  const [bidders, setBidders] = useState(['']);

  const handleAddBidder = () => {
    setBidders([...bidders, '']);
  };

  const handleBidderChange = (index, event) => {
    const newBidders = [...bidders];
    newBidders[index] = event.target.value;
    setBidders(newBidders);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/bids/${bidId}/invite`, {
        bidders,
      });
      console.log('Bidders invited:', response.data);
      alert('Bidders invited successfully');
    } catch (error) {
      console.error('Error inviting bidders:', error);
      alert('Error inviting bidders');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Invite Bidders</h2>
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
        {bidders.map((bidder, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700">Bidder {index + 1} ID:</label>
            <input
              type="text"
              className="border rounded w-full py-2 px-3"
              value={bidder}
              onChange={(event) => handleBidderChange(index, event)}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddBidder}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add Another Bidder
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded mt-4"
        >
          Invite Bidders
        </button>
      </form>
    </div>
  );
}

export default InviteBidders;

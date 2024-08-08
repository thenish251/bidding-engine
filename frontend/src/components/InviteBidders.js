import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function InviteBidders() {
  const { bidId } = useParams();
  const [bidderId, setBidderId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/bids/${bidId}/invite`, {
        bidders: [bidderId],
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Invite Bidders</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Bidder ID</label>
          <input
            type="text"
            value={bidderId}
            onChange={(e) => setBidderId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Invite
        </button>
      </form>
    </div>
  );
}

export default InviteBidders;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InviteBidders = () => {
  const [bids, setBids] = useState([]);
  const [selectedBid, setSelectedBid] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedBidders, setSelectedBidders] = useState([]); // Add this state

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bids');
        setBids(response.data);
      } catch (error) {
        console.error('Error fetching bids:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchBids();
    fetchUsers();
  }, []);

  const handleInvite = async () => {
    try {
      await axios.put(`http://localhost:5000/api/bids/${selectedBid}/invite`, { bidders: selectedBidders });
      alert('Invitations sent');
    } catch (error) {
      console.error('Error inviting bidders:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl mb-4">Invite Bidders</h1>
      <select
        className="border p-2 mb-4 w-full"
        value={selectedBid}
        onChange={(e) => setSelectedBid(e.target.value)}
      >
        <option value="">Select Bid</option>
        {bids.map(bid => (
          <option key={bid._id} value={bid._id}>{bid.title}</option>
        ))}
      </select>
      <ul>
        {users.map(user => (
          <li key={user._id} className="border p-2 mb-2">
            <input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedBidders(prev => [...prev, user._id]);
                } else {
                  setSelectedBidders(prev => prev.filter(id => id !== user._id));
                }
              }}
            />
            {user.username}
          </li>
        ))}
      </ul>
      <button
        className="bg-blue-500 text-white px-4 py-2"
        onClick={handleInvite}
      >
        Invite Bidders
      </button>
    </div>
  );
};

export default InviteBidders;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RespondToInvite = () => {
  const [invitations, setInvitations] = useState([]);
  const [userId, setUserId] = useState(''); 
  const [responseMap, setResponseMap] = useState({}); 
  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/bids/invitations/${userId}`);
        setInvitations(response.data);
        const initialResponseMap = response.data.reduce((map, invitation) => {
          map[invitation._id] = 'pending'; 
          return map;
        }, {});
        setResponseMap(initialResponseMap);
      } catch (error) {
        console.error('Error fetching invitations:', error);
      }
    };
    fetchInvitations();
  }, [userId]);

  const handleResponseChange = (bidId, response) => {
    setResponseMap(prev => ({ ...prev, [bidId]: response }));
  };

  const handleSubmit = async (bidId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/bids/${bidId}/respond`, { response: responseMap[bidId] });
      console.log('Response sent:', response.data);
    } catch (error) {
      console.error('Error sending response:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Respond to Invitations</h1>
      <ul>
        {invitations.map(invitation => (
          <li key={invitation._id} className="border p-2 mb-2">
            <p>{invitation.title}</p>
            <select
              className="border p-2 mb-2"
              value={responseMap[invitation._id] || 'pending'}
              onChange={(e) => handleResponseChange(invitation._id, e.target.value)}
            >
              <option value="pending">Select Response</option>
              <option value="accept">Accept</option>
              <option value="reject">Reject</option>
            </select>
            <button
              className="bg-blue-500 text-white px-4 py-2"
              onClick={() => handleSubmit(invitation._id)}
            >
              Submit Response
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RespondToInvite;

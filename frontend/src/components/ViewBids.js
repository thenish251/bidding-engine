import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewBids() {
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
      <h2 className="text-xl font-bold mb-4">All Bids</h2>
      {bids.length > 0 ? (
        <ul className="list-disc pl-5">
          {bids.map(bid => (
            <li key={bid._id}>
              <Link to={`/view-bids/${bid._id}`} className="text-blue-500 hover:underline">
                {bid.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bids available.</p>
      )}
    </div>
  );
}

export default ViewBids;

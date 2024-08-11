import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex space-x-4 text-white">
        <li><Link to="/create-bid">Create Bid</Link></li>
        <li><Link to="/view-users">View Users</Link></li>
        <li><Link to="/invite-bidders">Invite Bidders</Link></li>
        <li><Link to="/respond-invite">Respond to Invite</Link></li>
        <li><Link to="/place-bid">Place Bid</Link></li>
        <li><Link to="/view-bids">View Bids</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

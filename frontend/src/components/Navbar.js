import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">Bidding Engine</Link>
        <div>
          <Link to="/create-bid" className="text-gray-300 hover:text-white mx-2">Create Bid</Link>
          <Link to="/invite-bidders" className="text-gray-300 hover:text-white mx-2">Invite Bidders</Link>
          <Link to="/place-bid" className="text-gray-300 hover:text-white mx-2">Place Bid</Link>
          <Link to="/view-bids" className="text-gray-300 hover:text-white mx-2">View Bids</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

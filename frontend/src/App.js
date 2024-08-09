import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CreateBid from './components/CreateBid';
import InviteBidders from './components/InviteBidders';
import PlaceBid from './components/PlaceBid';
import ViewBids from './components/ViewBids';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto mt-8">
        <Routes>
          <Route path="/" element={<ViewBids />} />
          <Route path="/create-bid" element={<CreateBid />} />
          <Route path="/invite-bidders" element={<InviteBidders />} />
          <Route path="/place-bid" element={<PlaceBid />} />
          <Route path="/view-bids" element={<ViewBids />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateBid from './components/CreateBid';
import InviteBidders from './components/InviteBidders';
import PlaceBid from './components/PlaceBid';
import ViewBids from './components/ViewBids'; 

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Bidding App</h1>
        <Routes>
          <Route path="/create-bid" element={<CreateBid />} />
          <Route path="/invite-bidders/:bidId" element={<InviteBidders />} />
          <Route path="/place-bid/:bidId" element={<PlaceBid />} />
          <Route path="/view-bids/:bidId" element={<ViewBids />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;

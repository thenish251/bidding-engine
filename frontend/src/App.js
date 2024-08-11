import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CreateBid from './components/CreateBid';
import ViewUsers from './components/ViewUsers';
import InviteBidders from './components/InviteBidders';
import RespondToInvite from './components/RespondToInvite';
import PlaceBid from './components/PlaceBid';
import ViewBids from './components/ViewBids';



function App() {

  
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto mt-4">
        <Routes>
          <Route path="/create-bid" element={<CreateBid />} />
          <Route path="/view-users" element={<ViewUsers />} />
          <Route path="/invite-bidders" element={<InviteBidders />} />
          <Route path="/respond-invite" element={<RespondToInvite />} />
          <Route path="/place-bid" element={<PlaceBid />} />
          <Route path="/view-bids" element={<ViewBids />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

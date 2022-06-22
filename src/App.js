import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Navbar from './components/Navbar';
import Footer from './components/footer';
import SignUpModal from "./components/SignUpModal";
import SignInModal from "./components/SignInModal"
import Private from "./pages/Private/Private"
import PrivateHome from "./pages/Private/PrivateHome/PrivateHome";
import Account from "./pages/Account";
import Profile from "./pages/Profile";
import React from 'react';
import Payment from "./pages/Payment";
// import Stream from "./pages/stream";
// import Lobby from "./pages/lobby.js";
// import Room from "./pages/Room";

function App() {
  return (
    <>
      <SignUpModal />
      <SignInModal />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-account" element={<Account />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/coins" element={<Payment />} />
        {/* <Route path="/stream" element={<Stream />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/room/:roomId" element={<Room />} /> */}
        <Route path="/private" element={<Private />}>
          <Route path="/private/private-home" element={<PrivateHome />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register/Register';
import Login from './pages/login/Login';
import About from './pages/about/About';
import Home from './pages/homepage/Home';
import Profile from './pages/profile/ProfilePage.jsx';
import Book from './pages/booknow/Book';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Logout from './components/Logout'; 
import Contact from './pages/contact/Contact';
import Services from './pages/services/Services';
import AdminPage from './pages/admin/AdminPage';
import Nails from './pages/nails/Nails';
import Makeup from './pages/makeup/Makeup';
import AdminSettings from './pages/settings/AdminSettings';

// import AddService from './pages/addservice/Addservice';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/nails" element={<Nails />} />
        <Route path="/makeup" element={<Makeup />} />
        <Route path="/profile" element={<Profile />} />  {/* Corrected route */}
        <Route path="/settings" element={<AdminSettings />} />  {/* Corrected route */}

        <Route path="/book/:id" element={<Book />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/contact" element={<Contact />} />

        <Route path='/admin/dashboard' element={<AdminPage />} />
        {/* <Route path="/addservice" element={<AddService />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

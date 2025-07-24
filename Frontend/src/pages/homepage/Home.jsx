import React from 'react';
import Footer from '../../components/Footer/Footer';
import './home.css';

const Homepage = () => {
  const deluxeUrl = `${process.env.PUBLIC_URL}/assets/images/deluxe`;

  return (
    <div className="homepage">
      {/* Hero Section */}
      <div className="hero">
        <img src={`${deluxeUrl}/reception.jpg`} alt="beauty" className="hero-image" />
        <div className="hero-content">
          <h1>Welcome to The Beauty Aesthetics</h1>
          <p>Your perfect destination for makeup and nails booking</p>
          <a href="/services" className="btn btn-primary">Explore Services</a>
        </div>
      </div>

      {/* Features Section */}
      <div className="features">
        <div className="feature">
          <img src={`${deluxeUrl}/asd.jpg`} alt="Premium Makeup" className="feature-image" />
          <h3>Premium Makeup</h3>
          <p>Book professional makeup services for any occasion.</p>
        </div>
        <div className="feature">
          <img src={`${deluxeUrl}/fgh.jpg`} alt="Beautiful Nails" className="feature-image" />
          <h3>Beautiful Nails</h3>
          <p>Choose from a variety of nail art and extensions.</p>
        </div>
        <div className="feature">
          <img src={`${deluxeUrl}/4.jpg`} alt="Exceptional Service" className="feature-image" />
          <h3>Exceptional Service</h3>
          <p>Experience personalized and top-quality beauty care.</p>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials">
        <h2>What Our Customers have to Say</h2>
        <div className="testimonial">
          <p>"The best beauty booking experience I've ever had!"</p>
          <h4>- Sujina Shrestha</h4>
        </div>
        <div className="testimonial">
          <p>"Highly recommend studio for their excellent service."</p>
          <h4>- Jeena Shrestha</h4>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="cta">
        <h2>Ready to shine?</h2>
        <a href="/services" className="btn btn-success">Explore More</a>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Homepage;

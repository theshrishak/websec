import React, { useState } from 'react';
import './About.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Rating from 'react-rating-stars-component';

const About = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('user_id');
    if (!user || !token) {
      toast.error('Please log in to submit a review');
      return;
    }

    const reviewData = {
      rating,
      review,
      userId: id
    };

    setLoading(true);

    try {
      console.log('Submitting review with data:', reviewData);
      const response = await axios.post('http://localhost:5000/api/reviews', reviewData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      console.log('Server response:', response);

      if (response.data.success) {
        toast.success('Review submitted successfully');
        setRating(0);
        setReview('');
      } else {
        toast.error(response.data.message || 'Failed to submit review');
      }
    } catch (error) {
      console.error('There was an error submitting the review:', error);

      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        toast.error(error.response.data.message || 'Failed to submit review. Please try again later.');
      } else if (error.request) {
        console.error('Request data:', error.request);
        toast.error('No response from the server. Please try again later.');
      } else {
        console.error('Error message:', error.message);
        toast.error('Error in setting up the request. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="about">
      <header className="about-header">
        <div className="header-content">
          <h1>About Us</h1>
          <p>Delivering exceptional beauty experiences, tailored just for you.</p>
        </div>
      </header>

      <section className="about-section mission">
        <div className="section-content">
          <h2>Our Mission</h2>
          <p>
At The Beauty Aesthetics, we aim to redefine beauty care with professionalism, innovation, 
          and creativity. We ensure every client leaves feeling confident and radiant.          </p>
        </div>
        <div className="section-image">
          <img src={`${process.env.PUBLIC_URL}/assets/images/serviceimage/mission.jpg`} alt="Our Mission" />
        </div>
      </section>

      <section className="about-section rooms deluxe-rooms">
        <div className="section-content">
          <h2>Our Makeup Services</h2>
          <p>
  From glamorous bridal looks to chic party makeup, our expert artists craft stunning transformations. 
              Using high-quality products and the latest techniques, we ensure your makeup suits your occasion and personality.
                      </p>
        </div>
        <div className="section-images">
          <div className="room-image">
            <img src={`${process.env.PUBLIC_URL}/assets/images/serviceimage/7.jpg`} alt="Deluxe Room 1" />
          </div>
          <div className="room-image">
            <img src={`${process.env.PUBLIC_URL}/assets/images/serviceimage/asd.jpg`} alt="Deluxe Room 2" />
          </div>
          <div className="room-image">
            <img src={`${process.env.PUBLIC_URL}/assets/images/deluxe/8.jpg`} alt="Deluxe Room 3" />
          </div>
        </div>
      </section>

      <section className="about-section rooms non-deluxe-rooms">
        <div className="section-content">
          <h2>Our Nails Services</h2>
          <p>
 Discover a world of nail artistry! We offer a range of nail extensions, overlays, and creative art to suit your taste. 
              Our services combine precision, artistry, and durability to give you nails that stand out.
                    </p>
        </div>
        <div className="section-images">
          <div className="room-image">
            <img src={`${process.env.PUBLIC_URL}/assets/images/nondeluxe/16.jpg`} alt="Non-Deluxe Room 1" />
          </div>
          <div className="room-image">
            <img src={`${process.env.PUBLIC_URL}/assets/images/serviceimage/3dnailart.jpg`} alt="Non-Deluxe Room 2" />
          </div>
          <div className="room-image">
            <img src={`${process.env.PUBLIC_URL}/assets/images/serviceimage/fgh.jpg`} alt="Non-Deluxe Room 3" />
          </div>
        </div>
      </section>

      <section className="about-section review">
        <div className="section-content">
          <h2>Give Us a Review</h2>
          <form className="review-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="rating">Rating</label>
              <div className="rating-stars">
                <Rating 
                  count={5}
                  size={48} // Increase the size of the stars
                  value={rating}
                  onChange={(newRating) => setRating(newRating)}
                  activeColor="#ffd700"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="review">Review</label>
              <textarea
                id="review"
                name="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default About;

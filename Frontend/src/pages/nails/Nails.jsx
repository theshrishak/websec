import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllNailApi } from '../../api/Api';
import './Nails.css';

const Nail = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [getAllNail, setGetAllNail] = useState([]);
  const [loading,setLoading] = useState(true); 
  const [error,setError] = useState(null); 


  useEffect(() => {
    fetchAllNailFromBackend();
  }, []);

  const fetchAllNailFromBackend = async () => {
    try {
      const response = await getAllNailApi();
      console.log('Nail data: ', response);
      
      let responseBody = response.data;
      if (responseBody.success === true) {
        setGetAllNail(responseBody.data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching nail data: ', error);
      setError(error);
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    searchNail(e.target.value);
  };

  const searchNail = (searchTerm) => {
    if (searchTerm.trim() === '') {
      setGetAllNail([...getAllNail]);
    } else {
      const allNails = [...getAllNail];
      const filteredNail = allNails.filter((nail) =>
        nail.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setGetAllNail(filteredNail);
    }
  };

    // Loading Spinner
  if (loading) {
    return (
      <div style={styles.loaderContainer}>
        <div style={styles.loader}></div>
      </div>
    );
  }

  // Error Screen
  if (error) {
    return (
      <div style={styles.errorContainer}>
        <img
          src="https://discussions.apple.com/content/attachment/660042040" // Replace with your error image URL
          alt="Error"
          style={styles.errorImage}
        />
        <p style={styles.errorText}>Oops! {error}</p>
      </div>
    );
  }

  return (
    <div className="Nail-page">
      <h2>Available Nail</h2>
      <div className="top-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Trending Nail..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="Nails-list">
        {getAllNail.length > 0 ? (
          getAllNail.map((nail) => (
            <div className="nail" key={nail._id}>
              <img src={nail.image} alt={nail.title} className="nail-image" />
              <div className="nail-details">
                <h4>{nail.title}</h4>
                <p>
                  <strong>Price:</strong> Rs.{nail.price}
                </p>
                <p>
                  <strong>Facilities & Amenities:</strong>
                </p>
                <details>
                  <summary>View Facilities</summary>
                  <ul>
                    {nail.description.map((des, index) => (
                      <li key={index}>{des}</li>
                    ))}
                  </ul>
                </details>
                <Link to={`/book/${nail._id}`}>
                  <button className="purchase-button">Book Now</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No nails found.</p>
        )}
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full-screen height
  },
  loader: {
    border: '6px solid #f3f3f3', // Light grey
    borderTop: '6px solid #3498db', // Blue
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 1s linear infinite',
  },
  errorContainer: {
    textAlign: 'center',
    marginTop: '20%',
  },
  errorImage: {
    width: '150px',
    height: '150px',
  },
  errorText: {
    marginTop: '10px',
    fontSize: '18px',
    color: 'red',
  },
};

// Keyframes for loader animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

export default Nail;

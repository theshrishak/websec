import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Makeup.css';
import { getAllMakeupApi } from '../../api/Api';

const Makeup = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [getAllMakeup, setGetAllMakeup] = useState([]);
  const [loading,setLoading] = useState(true); 
  const [error,setError] = useState(null); 


  useEffect(() => {
    fetchAllMakeupFromBackend(); // Load all data initially
  }, []);


    const fetchAllMakeupFromBackend = async () => {
    try {
      const response = await getAllMakeupApi();
      console.log('Makeup data: ', response);
      
      let responseBody = response.data;
      if (responseBody.success === true) {
        setGetAllMakeup(responseBody.data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching Makeup data: ', error);
      setError(error);
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    searchMakeup(e.target.value);
  };

  const searchMakeup = (searchTerm) => {
    if (searchTerm.trim() === '') {
      setGetAllMakeup([...getAllMakeup]);
    } else {
      const allMakeups = [...getAllMakeup];
      const filteredMakeup = allMakeups.filter((makeup) =>
        makeup.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setGetAllMakeup(filteredMakeup);
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
    <div className="Makeup-page">
      <h2>Available Makeup</h2>
      <div className="top-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Trending Makeup..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="Makeups-list">
        {getAllMakeup.length > 0 ? (
          getAllMakeup.map((makeup) => (
            <div className="makeup" key={makeup.id}>
              <img src={makeup.image} alt={makeup.title} className="makeup-image" />
              <div className="makeup-details">
                <h4>{makeup.title}</h4>
                <p>
                  <strong>Price:</strong> Rs.{makeup.price}
                </p>
                <p>
                  <strong>Facilities & Amenities:</strong>
                </p>
                <details>
                  <summary>View Facilities</summary>
                  <ul>
                    {makeup.description.map((desc, index) => (
                      <li key={index}>{desc}</li>
                    ))}
                  </ul>
                </details>
                <Link to={`/book/${makeup._id}`}>
                  <button className="purchase-button">Book Now</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No makeups found.</p>
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

export default Makeup;

import React, {useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllNailApi,getAllMakeupApi } from '../../api/Api';
import './Services.css';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading,setLoading] = useState(true); 
    const [error,setError] = useState(null); 
  
  
    useEffect(() => {
      fetchAllServicesFromBackend(); // Load all data initially
    }, []);
  

  const fetchAllServicesFromBackend = async () => {
      try {
        const makeupResponse = await getAllMakeupApi();
        const nailResponse = await getAllNailApi();
        
        let makeupResponseBody = makeupResponse.data;
        let nailResponseBody = nailResponse.data;
        if (makeupResponseBody.success === true && nailResponseBody.success === true) {
          
          let fetchedServices = [...makeupResponseBody.data, ...nailResponseBody.data]
          fetchedServices.sort(() => Math.random() - 0.5);
          setServices(fetchedServices);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching Makeup data: ', error);
        setError(error);
        setLoading(false);
      }
    };

  return (
    <div className="services-page">
      <h2>Our Beauty Services</h2>
      <div className="services-list">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <img src={service.image} alt={service.title} className="service-image" />
            <div className="service-details">
              <h3>{service.title}</h3>
              <p className="service-description">{service.info}</p>
              <p className="service-price"><strong>Price:</strong> NRS {service.price}</p>
              <Link to={`/book/${service._id}`}>
                <button className="book-now-button">Book Now</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;

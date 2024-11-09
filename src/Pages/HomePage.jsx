import React from 'react';
import Image from '../assets/library.jpg';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div
      className="container-fluid p-0"
      style={{ height: '100vh', overflow: 'hidden' }}
    >
      <div className="row g-0" style={{ height: '100%' }}>
        <div
          className="col-12 d-flex justify-content-center align-items-center position-relative"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7))',
            height: '100%', // Make sure this takes full height
            overflow: 'hidden', // Prevent overflow
          }}
        >
          <img
            src={Image}
            alt="Library"
            className="img-fluid rounded-3 shadow-lg"
            style={{
              objectFit: 'cover',
              height: '100%', // Ensure image covers the container
              width: '100%',
              filter: 'brightness(60%)', // Darken image for better contrast
            }}
          />
          {/* Content Overlay */}
          <div
            className="position-absolute text-center text-white w-100 p-4"
            style={{ zIndex: 1 }}
          >
            <h1 className="display-4 fw-bold mb-4">Welcome to Book Finder</h1>
            <p className="lead mb-4">
              Find books by title, author, or genre to support your studies and
              interests.
            </p>
            <button
              className="btn btn-light btn-lg shadow-sm"
              onClick={() => navigate('/bookfinder')}
              style={{ padding: '10px 30px' }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

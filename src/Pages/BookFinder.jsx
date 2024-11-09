import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import 'bootstrap-icons/font/bootstrap-icons.css';

const BookFinder = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('fiction');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBooks(searchTerm, page);
  }, [page, searchTerm]);

  const fetchBooks = async (term, page = 1) => {
    if (term.trim() === '') {
      setBooks([]);
      return;
    }

    setIsLoading(true);
    const limit = page === 1 ? 12 : 20;
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?title=${term}&page=${page}&limit=${limit}`
      );
      setBooks(response.data.docs || []);
      setTotalPages(Math.ceil((response.data.numFound || 1) / limit));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setPage(1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  return (
    <div
      style={{
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        paddingBottom: '2rem',
      }}
    >
      <Navbar />

      {/* Loading Overlay */}
      {isLoading && (
        <div
          className="loading-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(2px)',
            zIndex: 1000,
          }}
        >
          <i
            className="bi bi-arrow-repeat spin-icon"
            style={{ fontSize: '3rem', color: 'red' }}
          ></i>
        </div>
      )}

      <div className={`container mt-4 ${isLoading ? 'blurred' : ''}`}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control w-50 mx-auto"
            style={{ borderColor: '#ced4da', borderRadius: '10px' }}
            placeholder="Search for a book..."
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>

        {books.length === 0 && !isLoading ? (
          <p className="text-center text-muted">
            {searchTerm
              ? 'No books found. Try another search term.'
              : 'Please enter a book title to search.'}
          </p>
        ) : (
          <>
            <div className="row">
              {books.map((book, index) => (
                <div key={index} className="col-md-3 col-sm-4 col-6 mb-4">
                  <div
                    className="card book-card h-100 shadow-sm"
                    style={{
                      borderRadius: '10px',
                      border: '1px solid #e9ecef',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    <img
                      src={
                        book.cover_i
                          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                          : 'https://via.placeholder.com/150x200?text=No+Image'
                      }
                      className="card-img-top book-cover"
                      style={{
                        borderRadius: '10px 10px 0 0',
                        maxHeight: '250px',
                      }}
                      alt={book.title}
                    />
                    <div className="card-body p-2">
                      <h5 className="card-title text-truncate text-dark">
                        {book.title}
                      </h5>
                      <p className="card-text text-truncate">
                        <strong className="text-danger">Author:</strong>{' '}
                        {book.author_name
                          ? book.author_name.join(', ')
                          : 'Unknown'}
                      </p>
                      <p className="card-text text-truncate">
                        <strong className="text-dark">Published:</strong>{' '}
                        {book.first_publish_year || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="pagination-controls text-center mt-4">
                <button
                  onClick={handlePreviousPage}
                  className="btn btn-light me-2"
                  style={{
                    color: '#495057',
                    backgroundColor: '#e9ecef',
                    border: '1px solid #ced4da',
                  }}
                  disabled={page === 1}
                >
                  <i
                    className="bi bi-arrow-left"
                    style={{ fontSize: '1.5rem' }}
                  ></i>
                </button>
                <span className="text-secondary">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  className="btn btn-light ms-2"
                  style={{
                    color: '#495057',
                    backgroundColor: '#e9ecef',
                    border: '1px solid #ced4da',
                  }}
                  disabled={page === totalPages}
                >
                  <i
                    className="bi bi-arrow-right"
                    style={{ fontSize: '1.5rem' }}
                  ></i>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookFinder;

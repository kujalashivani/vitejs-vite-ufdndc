import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const response = await axios.get(
        `https://openlibrary.org/works/${id}.json`
      );
      setBook(response.data);
    };
    fetchBook();
  }, [id]);

  return (
    <div className="container mt-5">
      {book ? (
        <>
          <h2>{book.title}</h2>
          <p>{book.description}</p>
          <p>
            <strong>Published:</strong> {book.first_publish_date}
          </p>
          <p>
            <strong>Subjects:</strong>{' '}
            {book.subjects ? book.subjects.join(', ') : 'N/A'}
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BookDetail;

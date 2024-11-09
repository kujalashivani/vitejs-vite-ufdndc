Book Finder Application
A React-based application that lets users search for books, view book details, and browse results using pagination. Built with the MERN Stack (MongoDB, Express, React, Node.js) and powered by the Open Library API.

Features
Search as you type: Instant book search results.
Book Details: Title, author, cover image, and publication year.
Pagination: Browse through search results.
Responsive Design: Works on mobile, tablet, and desktop.
Quick Start
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/book-finder-app.git
cd book-finder-app
Install dependencies:

Server:
bash
Copy code
cd server
npm install
Client:
bash
Copy code
cd ../client
npm install
Run the app:

Backend:
bash
Copy code
cd server
npm start
Frontend:
bash
Copy code
cd ../client
npm start
Access: Open http://localhost:3000 in your browser.

API Reference
Endpoint: https://openlibrary.org/search.json?title={bookTitle}&page={pageNumber}
Stack
Frontend: React, Axios
Backend: Node.js, Express.js
Database: MongoDB
API: Open Library API

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import BookReader from './components/BookReader';
import ChatBot from './components/ChatBot';
import Upload from './components/Upload';
import Navigation from './components/Navigation';
import NotFound from './components/NotFound';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);

  // Load initial book data
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBooks();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
        <Navigation />
        
        <div className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard books={books} />} />
            <Route 
              path="/read/:bookId" 
              element={<BookReader books={books} />} 
            />
            <Route path="/chat" element={<ChatBot />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

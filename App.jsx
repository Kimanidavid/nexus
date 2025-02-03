import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import BookReader from './components/BookReader';
import ChatBot from './components/ChatBot';
import Upload from './components/Upload';
import NotFound from './components/NotFound'; // New 404 component

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/read/:bookId" element={<BookReader />} />
          <Route path="/chat" element={<ChatBot />} />
          <Route path="/upload" element={<Upload />} />
          
          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

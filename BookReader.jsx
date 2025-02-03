// components/BookReader.jsx
const BookReader = () => {
  const [bookContent, setBookContent] = useState([]);
  const [activeChapter, setActiveChapter] = useState(0);
  const [analysis, setAnalysis] = useState(null);

  const getChapterAnalysis = async (chapterText) => {
    const response = await axios.post('/api/analyze', { text: chapterText });
    setAnalysis(response.data);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-white/10 p-4">
        {bookContent.map((chapter, index) => (
          <button
            key={index}
            onClick={() => setActiveChapter(index)}
            className={`chapter-btn ${index === activeChapter ? 'bg-blue-500' : ''}`}
          >
            Chapter {index + 1}
          </button>
        ))}
      </div>
      
      <div className="w-3/4 p-8 overflow-y-auto">
        <div className="text-content">
          {bookContent[activeChapter]?.content}
        </div>
        <button 
          onClick={() => getChapterAnalysis(bookContent[activeChapter]?.content)}
          className="analyze-btn"
        >
          Analyze Chapter
        </button>
        {analysis && <div className="analysis-panel">{analysis}</div>}
      </div>
    </div>
  );
};
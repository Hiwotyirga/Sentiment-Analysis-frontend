import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState(null);

  // Function to handle submission
  const handleAnalyze = async () => {
    if (!text.trim()) return;
    try {
      // Replace with your backend API call
      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const result = await response.json();
      setSentiment(result.sentiment); // Assuming your API returns a 'sentiment' field
    } catch (error) {
      console.error("Error analyzing text:", error);
    }
  };

  return (
    <div className="App">
      <h1>Sentiment Analysis</h1>
      <div className="input-area">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text for sentiment analysis..."
          rows="4"
          cols="50"
        />
        <button onClick={handleAnalyze}>Analyze</button>
      </div>
      {sentiment && (
        <div className="result-area">
          <h3>Analysis Result:</h3>
          <p>{sentiment}</p>
        </div>
      )}
    </div>
  );
}

export default App;

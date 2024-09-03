import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function Content() {
  const [message, setMessage] = useState('');
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    console.log('API URL:', apiUrl);

    fetch(`${apiUrl}`)  // Remove the trailing slash
      .then(response => {
        console.log('Message Response Status:', response.status);
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`HTTP status ${response.status}: ${text}`);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Message response:', data);
        setMessage(data.message);
      })
      .catch(error => {
        console.error('Error fetching message:', error);
        setMessage('Error loading message');
        setError(`Message Error: ${error.message}`);
      });

    fetch(`${apiUrl}/items`)
      .then(response => {
        console.log('Items Response Status:', response.status);
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`HTTP status ${response.status}: ${text}`);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Items response:', data);
        setItems(data.items);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
        setError(`Items Error: ${error.message}`);
      });
  }, []);

  const renderMainContent = () => (
    <>
      <h1 className="text-3xl font-bold mb-4">React + FastAPI Boilerplate</h1>
      <p className="text-gray-600 mb-4">This boilerplate demonstrates a full-stack application using React and FastAPI.</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Technologies Used</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>React (Create React App)</li>
          <li>FastAPI</li>
          <li>Axios for API requests</li>
          <li>Tailwind CSS for styling</li>
          <li>Render for deployment</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">API Integration Example</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        {message && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Message from API:</h3>
            <p className="text-gray-700">{message}</p>
          </div>
        )}
        
        <div>
          <h3 className="text-xl font-semibold mb-2">Items List:</h3>
          {items.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700">
              {items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No items to display.</p>
          )}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Additional Features</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Responsive design with Tailwind CSS</li>
          <li>Environment variable support for API URL</li>
          <li>Error handling for API requests</li>
          <li>Reusable Header and Footer components</li>
        </ul>
      </section>

      <section className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="text-2xl font-semibold mb-2">Getting Started</h2>
        <ol className="list-decimal list-inside text-gray-700">
          <li>Clone the repository</li>
          <li>Install dependencies for both frontend and backend</li>
          <li>Set up your API endpoint in the .env file (REACT_APP_API_URL)</li>
          <li>Run the FastAPI backend (uvicorn main:app --reload)</li>
          <li>Run the React frontend (npm start)</li>
          <li>Customize the components and API calls as needed</li>
          <li>Deploy to Render using the provided configuration files</li>
        </ol>
      </section>
    </>
  );

  switch(location.pathname) {
    case '/':
      return renderMainContent();
    case '/page1':
      return <h1 className="text-3xl font-bold mb-4">Page 1</h1>;
    case '/page2':
      return <h1 className="text-3xl font-bold mb-4">Page 2</h1>;
    case '/page3':
      return <h1 className="text-3xl font-bold mb-4">Page 3</h1>;
    default:
      return <div>Page not found</div>;
  }
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="*" element={<Content />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

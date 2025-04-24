import React, { useState } from 'react';
import './App.css';
import SearchBar from './Components/SearchBar'; 

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    console.log('Search term changed to:', value);
  };

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    
  };

  return (
    <div className="App">
      <header className="App-header">
      
        <p>Edit <code>src/App.js</code> and save to reload.</p>
        
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onSearch={handleSearch}
        />

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

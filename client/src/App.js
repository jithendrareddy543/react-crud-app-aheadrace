import React from 'react';
import ObjectTable from './components/ObjectTable'; // Import the ObjectTable component

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>Object Management</h1>
      </header>
      <main>
        <ObjectTable />
      </main>
    </div>
  );
};

export default App;

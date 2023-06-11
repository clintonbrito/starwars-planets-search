import React from 'react';
import './App.css';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';
import TableFilters from './components/TableFilters';

function App() {
  return (
    <PlanetsProvider>
      <TableFilters />
      <Table />
    </PlanetsProvider>
  );
}

export default App;

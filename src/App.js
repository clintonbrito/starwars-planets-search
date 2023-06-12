import React from 'react';
import './App.css';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';
import TableFilters from './components/TableFilters';
import Header from './components/Header';

function App() {
  return (
    <PlanetsProvider>
      <Header />
      <TableFilters />
      <Table />
    </PlanetsProvider>
  );
}

export default App;

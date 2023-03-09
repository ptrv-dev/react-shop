import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';

import HomePage from './pages/HomePage';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;

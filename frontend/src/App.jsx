import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { store } from './store';


// Main App Component that uses Redux
import { MainApp } from './components/MainApp';
import { Register, Login } from './components/Auth';

// App wrapper component that provides Redux store
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
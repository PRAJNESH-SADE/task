import React from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Posts from './components/Posts';
import './App.css';

const App = () => {
  return (
    <div>
      <Signup />
      <Login />
      <Posts />
    </div>
  );
};

export default App;

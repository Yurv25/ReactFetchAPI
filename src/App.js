import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Weather from "./components/weather";

class App extends Component {

  render() {
    
    return (
        <div>
          <h1>My first app</h1>
           <Weather />          
        </div>
    );
  }
}

export default App;

import React, { Component } from 'react';

import Header from './components/layout/header';
import Footer from './components/layout/footer';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <h1>
          Start<u>PIM</u>
        </h1>
        <p>Coming Soon...</p>
        <Footer />
      </div>
    );
  }
}

export default App;

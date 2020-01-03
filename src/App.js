import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';


class App extends Component {

  navigationData = [
    { id: 1, name: 'albums', displayName: 'Most listened to albums', route: '/albums' },
    { id: 2, name: 'recentTracks', displayName: 'Recently played tracks', route: '/recentTracks' },
    { id: 3, name: 'popularTracks', displayName: 'Most listed to tracks', route: '/popularTracks' }
  ];

  render() {
    return (
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
  }
}

export default App;
import React, { Component, useState  } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import {
    BrowserRouter as Router,
    Route, 
    Link, 
    Switch,
    Redirect
  } from "react-router-dom";

import './styles/index.css';

import MainsChart from './components/mains/MainsChart';
import MainsAuth from './components/mains/MainsAuth';

// apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
});

function App() {
    
  return (
    <ApolloProvider client={client}>

        <div>
            <nav className="majorNav">
                <a href="/login">
                    <button>Login</button>
                </a>

                <a href="/signup">
                    <button>Sign Up</button>
                </a>

                <a href="/chart">
                    <button>Charts</button>
                </a>
            </nav>

            <MainsChart />
            <MainsAuth />

        </div>
    </ApolloProvider>

  );
}

export default App;
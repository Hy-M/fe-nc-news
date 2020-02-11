import React, { Component } from 'react';
import { Router } from '@reach/router';
import './App.css';
import Title from './components/Title';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ArticlesList from './components/ArticlesList';
import SingleArticle from './components/SingleArticle';
import ErrorPage from './components/ErrorPage';

class App extends Component {
  state = {
    user: 'jessjelly'
  }

  render() {
    const { error } = this.state;
    return (
      <div className="App">
       <Title user={this.state.user} /> 
       <Nav />
       <Router>
         <ArticlesList path='/'/>
         <ArticlesList path='/:topic'/>
         <SingleArticle path='/articles/:article_id' user={this.state.user}/>
       </Router>
       <Footer />
      </div>
    );
  }
}

export default App;

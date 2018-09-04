import React, { Component } from 'react';
import Login from './components/auth/Login';
import AddAnnonce from './components/annonces/AddAnnonce';
import Register from './components/auth/Register';
import {Provider } from 'react-redux';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import NavbarLayout from './components/layouts/NavbarLayout';
import Annonces from './components/annonces/Annonces';
import Annonce from './components/annonces/Annonce';
import store from './store';
import CategoriesList from './components/annonces/CategoriesList'

import './App.css';
const content={
  margin: '15px 0 0 0'
}


class App extends Component {
  
  state = {
    key: 0
  }
  refreshAnnonces (){
    this.setState({ key : Math.random()});
  }

  render() {

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
          <div className="ui "></div>
            <NavbarLayout />

                <div style={content} className="ui container">
                  <div className="ui stackable grid">
                    <div className="computer only four wide column">< CategoriesList catChoice = {this.refreshAnnonces.bind(this)}/> </div>
                    <div className="nine wide column">
                      <Route path="/login" component={Login} />
                      <Route path="/register" component={Register} />
                      <Route exact path="/" key={this.state.key} component={Annonces} />
                      <Route path="/annonce/nouveau" component={AddAnnonce}/>
                      <Route path="/annonces/" component={Annonce}/>
                    </div>
                    <div className="three wide column computer tablet only">
                      <h5>Nouveau jobs: </h5>
                    </div>
                  </div>
                </div>
          </div>
          </Router>
      </Provider>
    );
  }
}

export default App;

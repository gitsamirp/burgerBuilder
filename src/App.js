import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
  render() {
    return (
      <div>
          <Layout>
            <Switch>
              <Route path="/checkout" component={Checkout}></Route>
              <Route path="/orders" exact component={Orders}></Route>
              <Route path="/auth" exact component={Auth}></Route>
              <Route path="/" exact component={BurgerBuilder}></Route>
              <Route path="/logout" exact component={Logout}></Route>

            </Switch>
          </Layout>
      </div>
    );
  }
}

export default App;

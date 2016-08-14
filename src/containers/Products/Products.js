import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class Products extends Component {

  state = {
    products: []
  }

  render() {
    return (
      <div className="container">
        <h1>Products</h1>
        <Helmet title="Products"/>

        <ul>
          <li>Test</li>
        </ul>
      </div>
    );
  }
}

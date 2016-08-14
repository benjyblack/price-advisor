import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {load} from 'redux/modules/products';

@connect(
    state => ({products: state.products.data}),
    dispatch => bindActionCreators({load}, dispatch))
export default class Products extends Component {
  static propTypes = {
    products: PropTypes.array,
    load: PropTypes.func.isRequired
  }

  render() {
    const { products, load } = this.props; // eslint-disable-line no-shadow
    return (
      <div className="container">
        <h1>Products</h1>
        <Helmet title="Products"/>

        <button className="btn btn-primary" onClick={load}>Load from server</button>

        <ul>
          {products && products.map(product => (<li>{product.name}</li>))}
        </ul>
      </div>
    );
  }
}

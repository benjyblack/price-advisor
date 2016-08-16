import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {load} from 'redux/modules/products';
import {Product} from 'components';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

@connect(
    state => ({products: state.products.data}),
    dispatch => bindActionCreators({load}, dispatch))
export default class Products extends Component {
  static propTypes = {
    products: PropTypes.array,
    load: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.load();
  }

  render() {
    const { products } = this.props; // eslint-disable-line no-shadow
    return (
      <div className="container">
        <h1>Products</h1>
        <Helmet title="Products"/>

        <Grid>
          <Row>
            {products && products.map(({id, name, description, price, thumbnailUrl}) => (
              <Col xs={6} md={4} key={id}>
                <Product
                  name={name}
                  description={description}
                  price={price}
                  thumbnailUrl={thumbnailUrl}
                />
              </Col>
            ))}
          </Row>
        </Grid>
      </div>
    );
  }
}

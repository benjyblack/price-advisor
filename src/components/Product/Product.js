import React, {Component, PropTypes} from 'react';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import Button from 'react-bootstrap/lib/Button';

export default class Product extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnailUrl: PropTypes.string,
    description: PropTypes.string
  }

  render() {
    return (
      <Thumbnail src={this.props.thumbnailUrl} alt={this.props.name}>
        <h3>{this.props.name}</h3>
        <p>{this.props.description}</p>
        <p>
          <Button bsStyle="primary">Get Price Suggestion</Button>
        </p>
      </Thumbnail>
    );
  }
}

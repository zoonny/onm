import React, { Component } from 'react';

class MenuAutTree extends Component {
  render() {
    const { title } = this.props;

    return (
      <span className="cus-label">
        <span>{title}</span>       
      </span>
    );
  }
}

export default MenuAutTree;

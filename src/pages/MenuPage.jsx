import React, { Component } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import MenuContent from '../components/MenuContent/MenuContent';

class MenuPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartCount: 0,
    };
  }

  addToCart = () => {
    this.setState((prevState) => ({
      cartCount: prevState.cartCount + 1,
    }));
  };

  render() {
    return (
      <div className="menu-page">
        <Header cartCount={this.state.cartCount} />
        <MenuContent addToCart={this.addToCart} />
        <Footer />
      </div>
    );
  }
}

export default MenuPage;
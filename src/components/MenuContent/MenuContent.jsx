import React, { Component } from 'react';
import Button from '../Button/Button';
import ProductCard from '../Card/ProductCard';
import './MenuContent.css';

class MenuContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [],
      visibleItems: 6,
      selectedCategory: 'Dessert',
    };
  }


  componentDidMount() {
    fetch('https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals')
      .then(response => response.json())
      .then(data => this.setState({ menuItems: data }))
      .catch(error => console.error('Error fetching data:', error));
  }

  handleSeeMore = () => {
    this.setState(prevState => ({
      visibleItems: prevState.visibleItems + 6,
    }));
  };
  
  
  handleCategoryChange = (category) => {
    this.setState({
      selectedCategory: category,
      visibleItems: 6, // Reset visible items when switching categories
    });
  };

  render() {
    const { menuItems, visibleItems, selectedCategory } = this.state;
    const { addToCart } = this.props; 
    const filteredItems = menuItems.filter(item => item.category === selectedCategory);

    return (
      <div className="menu-section">
        <main>
          <h2 className="text-h2">Browse our menu</h2>
          <p className="text-p">
            Use our menu to place an order online, or{' '}
            <span className="tooltip">
              phone
              <span className="tooltip-text">+123-456-7890</span>
            </span>{' '}
            our store <br /> to place a pickup order.
          </p>

          <div className="button-group">
           <Button
              label="Dessert"
              isActive={selectedCategory !== 'Dessert'}
              className={`button ${selectedCategory === 'Dessert' ? 'inactive' : ''}`}
              onClick={() => this.handleCategoryChange('Dessert')}
            />
            <Button
              label="Dinner"
              isActive={selectedCategory !== 'Dinner'}
              onClick={() => this.handleCategoryChange('Dinner')}
            />
            <Button
              label="Breakfast"
              isActive={selectedCategory !== 'Breakfast'}
              onClick={() => this.handleCategoryChange('Breakfast')}
            />
          </div>

          <div className="menu-list">
            {filteredItems.slice(0, visibleItems).map(item => (
              <ProductCard
                key={item.id}
                product={{
                  name: item.meal,
                  price: `$${item.price} USD`,
                  description: item.instructions.substring(0, 100) + '...',
                  image: item.img,
                }}
                addToCart={addToCart} // Pass addToCart to ProductCard
              />
            ))}
          </div>

          {visibleItems < filteredItems.length && (
            <Button
              className="see-more-button"
              label="See more"
              onClick={this.handleSeeMore}
            />
          )}
        </main>
      </div>
    );
  }
}

export default MenuContent;

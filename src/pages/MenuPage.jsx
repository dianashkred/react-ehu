import React from 'react';
import Button from '../components/Button/Button';
import ProductCard from '../components/Card/ProductCard';
import menuItems from '../data/menuItems';
import './MenuPage.css';

const MenuPage = () => {
  return (
    <div className="menu-page">
      <main>
        <h2 class = "text-h2">Browse our menu</h2>
        <p class = "text-p">
          Use our menu to place an order online, or <span className="tooltip">phone   
            <span className="tooltip-text">+123-456-7890</span>
          </span> {" "}
           our store <br /> to place a pickup order.
        </p>
        
        <div className="button-group">
          <Button label="Desert" onClick={() => console.log("Desert selected")}  />
          <Button label="Dinner" onClick={() => console.log("Dinner selected")} isActive={false} />
          <Button label="Breakfast" onClick={() => console.log("Breakfast selected")} isActive={false}  />
        </div>

        <div className="menu-list">
          {menuItems.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
        <Button className="see-more-button" label="See more" onClick={() => console.log("See more clicked")} />
      </main>
    </div>
  );
};

export default MenuPage;

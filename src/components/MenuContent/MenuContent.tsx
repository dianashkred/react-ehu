import React, { FC, useState, useEffect } from 'react';
import Button from '../Button/Button';
import ProductCard from '../Card/ProductCard';
import './MenuContent.css';

interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
}
interface MenuContentProps {
  addToCart: (id: string) => void;
}
const MenuContent: FC<MenuContentProps> = ({ addToCart }) => {
  const VISIBLE_ITEMS_INCREMENT = 6;
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [visibleItems, setVisibleItems] = useState<number>(VISIBLE_ITEMS_INCREMENT);
  const [selectedCategory, setSelectedCategory] = useState<string>('Dessert');
  
  useEffect(() => {
    fetch('https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals')
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item: any) => ({
          id: item.id,
          name: item.meal,
          price: `$${item.price.toFixed(2)} USD`,
          description: item.instructions.substring(0, 100) + '...',
          image: item.img,
          category: item.category,
        }));
        setMenuItems(formattedData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSeeMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + VISIBLE_ITEMS_INCREMENT);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setVisibleItems(VISIBLE_ITEMS_INCREMENT);
  };

  const filteredItems = menuItems.filter((item) => item.category === selectedCategory);

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
            onClick={() => handleCategoryChange('Dessert')}
          />
          <Button
            label="Dinner"
            isActive={selectedCategory !== 'Dinner'}
            onClick={() => handleCategoryChange('Dinner')}
          />
          <Button
            label="Breakfast"
            isActive={selectedCategory !== 'Breakfast'}
            onClick={() => handleCategoryChange('Breakfast')}
          />
        </div>

        <div className="menu-list">
          {filteredItems.slice(0, visibleItems).map((item) => (
            <ProductCard
              key={item.id}
              product={{
                name: item.name,
                price: item.price,
                description: item.description,
                image: item.image,
              }}
              addToCart={() => addToCart(item.id)}
            />
          ))}
        </div>

        {visibleItems < filteredItems.length && (
          <Button
            className="see-more-button"
            label="See more"
            onClick={handleSeeMore}
          />
        )}
      </main>
    </div>
  );
};

export default MenuContent;
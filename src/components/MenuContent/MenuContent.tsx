import  { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import { fetchMenuItems, setVisibleItems, setSelectedCategory } from '../../features/menu/menuSlice';
import Button from '../Button/Button';
import ProductCard from '../Card/ProductCard';
import './MenuContent.css';


const MenuContent: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { items, categories, selectedCategory, visibleItems, status } = useSelector(
    (state: RootState) => state.menu
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMenuItems());
    }
  }, [status, dispatch]);

  const filteredItems = items.filter((item) => item.category === selectedCategory);
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
        {categories.map((category) => (
          <Button
            key={category}
            label={category}
            isActive={selectedCategory !== category}
            onClick={() => dispatch(setSelectedCategory(category))}
          />
        ))}
      </div>
      <div className="menu-list">
        {filteredItems.slice(0, visibleItems).map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
      {visibleItems < filteredItems.length && (
        <Button label="See more" 
          onClick={() => dispatch(setVisibleItems(visibleItems + 6))} 
        />
      )}
      </main>
    </div>
  );
};

export default MenuContent;










/*onst MenuContent: FC<MenuContentProps> = ({ addToCart }) => {
  const VISIBLE_ITEMS_INCREMENT = 6;
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [visibleItems, setVisibleItems] = useState<number>(VISIBLE_ITEMS_INCREMENT);
  const [selectedCategory, setSelectedCategory] = useState<string>('Dessert');
  const [categories, setCategories] = useState<string[]>([]);
  
  useEffect(() => {
    fetch('https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals')
      .then((response) => response.json())
      .then((data: MenuItem[]) => {
        const formattedData = data.map((item: any) => ({
          id: item.id,
          name: item.meal,
          price: `$${item.price.toFixed(2)} USD`,
          description: item.instructions.substring(0, 100) + '...',
          image: item.img,
          category: item.category,
        }));
        setMenuItems(formattedData);
        const uniqueCategories = Array.from(new Set(formattedData.map((item) => item.category)));
        setCategories(uniqueCategories);
        setSelectedCategory(uniqueCategories[0] || ''); 
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
        {categories.map((category) => (
        <Button
              key={category}
              label={category}
              isActive={selectedCategory !== category}
              onClick={() => handleCategoryChange(category)}
            />
          ))}
        </div>

        <div className="menu-list">
          {filteredItems.slice(0, visibleItems).map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              addToCart={(quantity)=> addToCart(item.id, quantity)}
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
*/
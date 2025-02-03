import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import type { AppDispatch, RootState } from '../../features/store';
import { fetchMenuItems, setVisibleItems, setSelectedCategory } from '../../features/menu/menuSlice';
import Button from '../Button/Button';
import ProductCard from '../Card/ProductCard';

const MenuSection = styled.div`
  font-family: Inter, sans-serif;
  background-image:  var(--background-mlo);
  background-size: cover;
  background-repeat: no-repeat;
  padding: 2rem 0;
  text-align: center;
  color: var(--text-color);
`;

const Heading = styled.h2`
  color: var(--text-color-turquoise);
  font-size: 50px;
  font-weight: 400;
  line-height: 55px;
  letter-spacing: 1.65px;
  margin-top: 5rem;
`;

const Paragraph = styled.p`
  color:  var(--text-color);
  font-weight: 400;
  font-size: 16px;
  line-height: 27px;
  letter-spacing: 0.36px;
`;

const Tooltip = styled.span`
  position: relative;
  cursor: pointer;
  color: var(--text-color-turquoise);
  font-weight: 400;
  font-size: 16px;

  & .tooltip-text {
    visibility: hidden;
    width: 120px;
    background-color: var(--background-color-turquoise);
    color: #fff;
    text-align: center;
    border-radius: 5px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 30px 0;
`;

const MenuList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 40px;
`;

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
    <MenuSection>
      <main>
        <Heading>Browse our menu</Heading>
        <Paragraph>
          Use our menu to place an order online, or{' '}
          <Tooltip>
            phone
            <span className="tooltip-text">+123-456-7890</span>
          </Tooltip>{' '}
          our store <br /> to place a pickup order.
        </Paragraph>
        <ButtonGroup>
          {categories.map((category) => (
            <Button
              key={category}
              label={category}
              isActive={selectedCategory !== category}
              onClick={() => dispatch(setSelectedCategory(category))}
            />
          ))}
        </ButtonGroup>
        <MenuList>
          {filteredItems.slice(0, visibleItems).map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </MenuList>
        {visibleItems < filteredItems.length && (
          <Button
            label="See more"
            onClick={() => dispatch(setVisibleItems(visibleItems + 6))}
          />
        )}
      </main>
    </MenuSection>
  );
};

export default MenuContent;

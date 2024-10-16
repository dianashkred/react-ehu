import React from 'react';
import './ItemList.css';

const ItemList = () => {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  return (
    <div className="item-list">
      {items.map((item, index) => (
        <div key={index} className="item">
          {item}
        </div>
      ))}
    </div>
  );
};

export default ItemList;

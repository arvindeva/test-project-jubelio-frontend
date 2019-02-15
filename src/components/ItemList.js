import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';

import Item from './Item';

const ItemList = props => {
  const deleteItem = item => {
    props.deleteItemGrand(item);
  };

  const updateItem = item => {
    props.updateItemGrand(item);
  };

  return (
    <div>
      <h1 className="title">Daftar Barang</h1>
      <div className="tile is-ancestor" style={{ flexWrap: 'wrap' }}>
        {props.items.map(item => (
          <Item
            item={item}
            key={item.id}
            deleteItem={deleteItem}
            updateItem={updateItem}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemList;

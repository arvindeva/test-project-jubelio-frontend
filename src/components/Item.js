import React from 'react';
import { Card, Button } from 'react-bulma-components/full';

import { formatMoney } from '../helpers';

const Item = props => {
  const handleDeleteClick = e => {
    props.deleteItem(props.item);
  };

  const handleUpdateClick = e => {
    props.updateItem(props.item);
  };

  return (
    <>
      <Card className="tile is-12 is-parent" style={{ margin: '10px' }}>
        <img
          src={props.item.image_url}
          alt={props.item.name}
          style={{ display: 'block', width: '300px', height: '300px' }}
        />
        <br />
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{props.item.name}</p>
            </div>
          </div>

          <div className="content">{props.item.description}</div>
          <div className="content">{formatMoney(props.item.price)}</div>
          <br />
          <div>
            <Button
              color="primary"
              size="large"
              rounded
              style={{ margin: '5px' }}
              onClick={handleUpdateClick}
            >
              Edit
            </Button>
            <Button
              color="danger"
              size="large"
              rounded
              style={{ margin: '5px' }}
              onClick={handleDeleteClick}
            >
              Delete
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Item;

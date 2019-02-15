import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';

import 'react-bulma-components/dist/react-bulma-components.min.css';

import Header from './Header';
import NewItemForm from './NewItemForm';
import ItemList from './ItemList';
import { compare } from '../helpers';

Modal.setAppElement('#root');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      modalIsOpen: false,
      selectedItemId: 0,
      name: '',
      description: '',
      price: ''
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {}

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleNameChange = event => {
    this.setState({
      name: event.target.value
    });
  };

  handleDescriptionChange = event => {
    this.setState({
      description: event.target.value
    });
  };

  handlePriceChange = event => {
    this.setState({
      price: event.target.value
    });
  };

  componentDidMount() {
    axios.get(`http://localhost:5000/api/items`).then(res => {
      if (!res.data.error) {
        this.setState({ items: res.data.sort(compare) });
      }
    });
  }

  addItems = item => {
    this.setState({
      items: [...this.state.items, item.data]
    });
  };

  deleteItemGrand = item => {
    axios.delete(`http://localhost:5000/api/items/${item.id}`).then(res => {
      const deleteId = res.data.id;
      const items = this.state.items.slice();
      const newItems = items.filter(
        item => item.id.toString() !== deleteId.toString()
      );
      this.setState({
        items: newItems
      });
    });
  };

  updateItemGrand = item => {
    this.setState({
      selectedItemId: item.id,
      name: item.name,
      description: item.description,
      price: item.price
    });
    this.openModal();
  };

  handleUpdateSubmit = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('id', this.state.selectedItemId);
    formData.append('name', this.state.name);
    formData.append('description', this.state.description);
    formData.append('price', this.state.price);
    axios
      .put(
        `http://localhost:5000/api/items/${this.state.selectedItemId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      .then(response => {
        const newData = response.data.newItem;
        const newItems = this.state.items.slice();

        for (let i = 0; i < newItems.length; i++) {
          if (newItems[i].id === this.state.selectedItemId) {
            newItems[i].name = newData.name;
            newItems[i].description = newData.description;
            newItems[i].price = newData.price;
          }
        }
        this.setState({
          items: newItems,
          modalIsOpen: false
        });
      });
  };

  render() {
    return (
      <div className="container">
        <Header />
        <br />
        <NewItemForm addItems={this.addItems} />
        <br />
        <ItemList
          items={this.state.items}
          deleteItemGrand={this.deleteItemGrand}
          updateItemGrand={this.updateItemGrand}
        />
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          className="modal-card"
        >
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Update Item</p>
            </header>

            <section className="modal-card-body">
              <form onSubmit={this.handleUpdateSubmit}>
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      value={this.state.name}
                      onChange={this.handleNameChange}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Description</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      value={this.state.description}
                      onChange={this.handleDescriptionChange}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Price</label>
                  <div className="control">
                    <input
                      className="input"
                      type="number"
                      value={this.state.price}
                      onChange={this.handlePriceChange}
                      required
                    />
                  </div>
                </div>

                <div className="control">
                  <button className="button is-primary">Submit</button>
                </div>
                <button className="button" onClick={this.closeModal}>
                  Cancel
                </button>
              </form>
            </section>
          </div>
        </Modal>
      </div>
    );
  }
}

export default App;

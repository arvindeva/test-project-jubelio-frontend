import React from 'react';
import axios from 'axios';
import 'react-bulma-components/full';

class NewItemForm extends React.Component {
  state = {
    showForm: true,
    name: '',
    description: '',
    price: '',
    selectedFile: null
  };

  handleHideClick = () => {
    this.state.showForm
      ? this.setState({ showForm: false })
      : this.setState({ showForm: true });
  };

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

  handleFileChange = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('description', this.state.description);
    formData.append('price', this.state.price);
    formData.append('file', this.state.selectedFile);
    axios
      .post('http://localhost:5000/api/items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        this.props.addItems(response.data);
      });
  };

  render() {
    const showForm = this.state.showForm ? {} : { display: 'none' };
    const showText = this.state.showForm ? 'Hide' : 'Show';

    return (
      <div>
        <div className="level-left">
          <div className="level-item">
            <h3 className="title">Tambah Barang</h3>
          </div>
          <div className="level-item">
            <button
              className="button is-primary"
              onClick={this.handleHideClick}
            >
              {showText}
            </button>
          </div>
        </div>
        <form style={showForm} onSubmit={this.handleSubmit}>
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
          <div className="field">
            <div className="file has-name">
              <label className="file-label">
                <input
                  className="file-input"
                  type="file"
                  name="image"
                  onChange={this.handleFileChange}
                  required
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload" />
                  </span>
                  <span className="file-label">Choose a file…</span>
                </span>
              </label>
            </div>
          </div>
          <div className="control">
            <button className="button is-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewItemForm;

import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

class ImagesEdit extends React.Component {

  state = {}

  handleSubmit = (event) => {
    event.preventDefault(); // don't refresh the page
    console.log('Image uploaded!', this.state);
    const imageData = {
      uploadedBy: Auth.currentUserId(),
      content: this.state.caption,
      imageUrl: this.state.imageUrl,
      tags: this.state.tags
    };
    axios.put('/api/images/${imageId}', imageData, this.state, Auth.bearerHeader())
      .then(() => this.props.history.push(`/users/${Auth.currentUserId()}`)); // redirect to the users page
  }

  handleChange = ({ target: {name, value} }) => {
    console.log('Handle change is called...', name, value);
    this.setState({ [name]: value });
  }

  render() {
    console.log('into the images new component...');
    return (
      <section className="section uploadImageSection">
        <h4 className="title is-4 has-text-white has-text-centered">Edit Image</h4>

        <form onSubmit={this.handleSubmit} className="form">


          {/* Caption */}
          <input
            onChange={this.handleChange}
            className="input"
            name="caption"
            type="text"
            placeholder="Caption"
            value={this.state.caption || ''}>
          </input>

          {/* Tags */}
          <input
            onChange={this.handleChange}
            className="input"
            name="tags"
            type="text"
            placeholder="Tags"
            value={this.state.tags || ''}>
          </input>

          <button className="button is-fullwidth is-primary">Upload Image</button>
        </form>

      </section>
    );
  }
}

export default ImagesEdit;

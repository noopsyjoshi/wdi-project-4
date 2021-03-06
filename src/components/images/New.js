import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

import ReactFilestack from 'filestack-react';

class ImagesNew extends React.Component {

  state = {
    active: false
  }

  handleSubmit = (event) => {
    event.preventDefault(); // don't refresh the page
    console.log('Image uploaded!', this.state);
    const imageData = {
      uploadedBy: Auth.currentUserId(),
      caption: this.state.caption,
      imageUrl: this.state.imageUrl,
      tags: this.state.tags
    };
    axios.post('/api/images', imageData, this.state, Auth.bearerHeader())
      .then(() => this.props.history.push(`/users/${Auth.currentUserId()}`))// redirect to the users page
      .catch(() => {
        this.toggleClass();
      });
  }

  toggleClass = () => {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
    console.log('the modal is open', this.currentState);
  }


  handleChange = ({ target: {name, value} }) => {
    console.log('Handle change is called...', name, value);
    this.setState({ [name]: value });
  }

  onSuccess = (result) => {
    this.setState({
      imageUrl: result.filesUploaded[0].url
    });
  }

  onError = (error) => {
    console.error('error', error);
  }

  render() {
    console.log('into the images new component...');
    return (
      <section className="section uploadImageSection">

        <h2>Upload an Image</h2>

        <form onSubmit={this.handleSubmit} className="form">

          {/* Image Url */}
          {/* <input
            onChange={this.handleChange}
            className="input"
            name="imageUrl"
            type="text"
            placeholder="Image URL"
            value={this.state.imageUrl || ''}>
          </input> */}

          <ReactFilestack
            apikey="AttzzTT2qRw6FJXs4TnD6z"
            // options={basicOptions}
            buttonText="Click here to select an image"
            buttonClass="filestackButton"
            onSuccess={this.onSuccess}
            onError={this.onError}
          />

          <h3>Selected Image:</h3>
          <img src={this.state.imageUrl} />

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
            placeholder="Tags, separated with a space"
            value={this.state.tags || ''}>
          </input>

          <button className="button is-fullwidth is-primary">Upload Image</button>
        </form>

        {/* <div className={`${this.state.active ? 'is-active': null} modal `}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <section className="modal-card-body">
              <h5 className="title is-5">Please select an image</h5>
            </section>
            <footer className="modal-card-foot">
              <button onClick={this.toggleClass} className="button">Ok</button>
            </footer>
          </div>
        </div> */}

      </section>
    );
  }
}

export default ImagesNew;

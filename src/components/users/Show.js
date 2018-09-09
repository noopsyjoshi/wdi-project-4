import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';

// import Map from '../common/Map';

class UsersShow extends React.Component {

  state = {}

  componentDidMount() {

    let userData = {};

    axios
      .get(`/api/users/${this.props.match.params.id}`)
      .then(res => {
        userData = res.data;
        console.log('userData is', userData);
      })
      .then(() => {
        axios.get('/api/images')
          .then(res => {
            console.log('res is', res);
            const images = res.data;
            console.log('imageData is', imageData);
            const imageData = images.filter(image => image.uploadedBy === userData._id);
            console.log('imageData is now', imageData);
            this.setState({ images: imageData, user: userData });
          });
      });
  }

  handleChange = (event) => {
    const { target: { name, value }} = event;
    this.setState({ [name]: value });
  }

  createReview = (event) => {
    console.log('event is', event);
    event.preventDefault();
    const userId = this.props.match.params.id;
    // Building the data to send to the db
    const reviewData = {
      addedBy: Auth.currentUserId(),
      content: this.state.review
    };
    axios
      .post(`/api/users/${userId}/reviews`, reviewData)
      .then(res => this.setState({ user: res.data }))
      .catch(err => console.log('Error =>', err));
  }

  deleteReview = (reviewId) => {
    console.log();
    return() => {
      console.log(`Delete comment ${reviewId}`);
      const userId = this.props.match.params.id;
      // we want to delete it from the db
      axios
        .delete(`/api/users/${userId}/reviews/${reviewId}`)
        .then(res => this.setState({user: res.data}))
        .catch(err => console.log('Error deleting', err));
    };
  }

  render() {
    const user = this.state.user;
    const images = this.state.images;

    console.log('user is', user);

    return(
      <section className="section">

        {user &&
          <div className="container columns is-multiline has-text-centered">

            <img className="profilePic" src={user.profilePic} alt={user.firstName}></img>
            <h2>{user.firstName} {user.lastName}</h2>
            <h3>{user.type}</h3>

            {/* Postcode */}
            <h3>{user.postcode}</h3>

            {/* Interests */}
            <div className="section">
              <h3>Interests</h3>
              { user.interests.map(interest =>
                <div key={user._id} className="tag has-background-primary has-text-white">{interest}</div>
              )}
            </div>

            {/* Description */}
            <h3>Description</h3>
            <p className="">{user.description}</p>

            {/* Reviews */}
            <div className="section">
              <h3>Reviews</h3>
              {user.reviews.map(review =>

                <div key={review._id}
                  className="userReviews columns is-multiline is-mobile">
                  <div className="column is-4">
                    <figure className="image is-64x64">
                      <img className="is-rounded" src={review.addedBy.profilePic} />
                    </figure>
                  </div>

                  <div><p>{review.addedBy.username}</p></div>
                  <p>{review.content}</p>
                  {Auth.currentUserId() === review.addedBy._id &&
                  <button onClick={this.deleteReview(review._id)} className="button is-small is-outlined is-primary">Delete</button>
                  }
                </div>
              )}

              <div>
                <form onSubmit={this.createReview}>
                  <input onChange={this.handleChange} name="review" className="input has-text-white" value={this.state.review || ''} />
                  <button className="button is-primary is-fullwidth" type="submit">Add Review</button>
                </form>
              </div>
            </div>

            {/* Ratings */}
            {/* // TODO: Get the average rating... use reduce? */}
            {/* <div className="section">
              <h3>Ratings</h3>
              <div className="section columns has-text-white">
                {user.ratings.map(rating =>
                  <p key={rating._id}>{rating.number}</p>
                )}
              </div>
            </div> */}

            {/* Portfolio */}
            <h3 className="has-text-dark">Portfolio</h3>
            <div className="columns has-background-white">
              { images.map(image =>
                <Link key={image._id} to={`/images/${image._id}`}>
                  <div className="column">
                    <img className="userPortfolio" key={image._id} src={image.imageUrl} />
                  </div>
                </Link>
              )}
            </div>

            {Auth.currentUserId() === this.props.match.params.id  &&
            <Link className="button is-primary is-rounded is-outlined" to={`/users/${user._id}/edit`}>Edit Profile</Link>
            }
            {/* <Map /> */}
          </div>
        }
      </section>
    );
  }
}

export default UsersShow;

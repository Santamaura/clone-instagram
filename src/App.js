import React, { Component } from 'react';
import { connect } from 'react-redux'

import './App.css';
import Header from './components/Header';
import Post from './components/Post';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { comments } = this.props;
    return (
      <div className="App">
        <Header />
        <section className="App-main">
          <div className="pageView">
            <Post nickname="tarantinoxx" avatar="https://cdn4.themagger.net/wp-content/uploads/2019/07/tarantino-180x180.jpg"
              caption="Out in theatres now!" image="https://direct.rhapsody.com/imageserver/images/alb.397910453/600x600.jpg" 
              comments={comments}/>

            {/* more posts */}
            {/* need change it to be multiple comments this is just one */}
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      comments: state.comments,
  }
};

export default connect(
  mapStateToProps,
)(App);
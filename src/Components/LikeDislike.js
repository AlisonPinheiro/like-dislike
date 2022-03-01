import { Component } from 'react';

const reduceOne = (prevState, groupName, otherGroupName) => {
  prevState[groupName].wasClicked
    ? prevState[groupName].count = prevState[groupName].count - 1
    : prevState[groupName].count = prevState[groupName].count + 1;
  prevState[groupName].wasClicked = !prevState[groupName].wasClicked;
  if (prevState[otherGroupName].wasClicked) {
    prevState[otherGroupName].count = prevState[otherGroupName].count - 1;
    prevState[otherGroupName].wasClicked = false;
  }
  return prevState;
};

const reducer = action =>
  (prevState, props) =>
    action.type === "TOGGLE_LIKE"
      ? reduceOne(prevState, "like", "dislike")
      : reduceOne(prevState, "dislike", "like");

export default class LikeDislike extends Component {
  state = {
    like: {
      count: 100,
      wasClicked: false,
    },
    dislike: {
      count: 25,
      wasClicked: false,
    },
  };

  toggleLike = () => this.setState(reducer({ type: "TOGGLE_LIKE" }));
  toggleDislike = () => this.setState(reducer({ type: "TOGGLE_DISLIKE" }));

  render() {
    return (
      <>
        <div>
          <h2>Like/Dislike</h2>
        </div>

        <button
          className={this.state.like.wasClicked ? 'liked like-button' : 'like-button'}
          onClick={this.toggleLike}>
          Like | <span className="likes-counter">{this.state.like.count}</span>
        </button>
        <button
          className={this.state.dislike.wasClicked ? 'disliked dislike-button' : 'dislike-button'}
          onClick={this.toggleDislike}>
          Dislike | <span className="dislikes-counter">{this.state.dislike.count}</span>
        </button>

      </>
    );
  }
}

<LikeDislike />

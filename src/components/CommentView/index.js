import React, { Component } from "react";
import "./CommentView.css";
import Comment from '../Comment';
import { connect } from 'react-redux';
import { addComment, likeComment, removeLikeComment, likeReply, removeLikeReply, addReply } from "../../actions";

class CommentView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewNumReplies: props.comments.length > 12 ? props.comments.length : 12,
            value: '',
        };

        this.renderComments = this.renderComments.bind(this);
        this.viewCommentsOnclick = this.viewCommentsOnclick.bind(this);
        this.hideCommentsOnclick = this.hideCommentsOnclick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.likeCommentOnClick = this.likeCommentOnClick.bind(this);
        this.removelikeCommentOnClick = this.removelikeCommentOnClick.bind(this);
        this.likeReplyOnClick = this.likeReplyOnClick.bind(this);
        this.removelikeReplyOnClick = this.removelikeReplyOnClick.bind(this);
    }

    componentWillUnmount(props) {
        this.setState({
            viewNumReplies: props.comments.length > 12 ? props.comments.length : 12,
        });
    }

    viewCommentsOnclick() {
        this.setState((state) => ({
            viewNumComments: state.viewNumComments + 3,
        }));
    }

    hideCommentsOnclick() {
        this.setState({
            viewNumComments: 0,
        });
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        const newComment = {
            user: 'Main user',
            text: this.state.value,
            numOfLikes: 0,
            liked: false,
            replies: []
        };
        this.props.dispatch(addComment(newComment));
        event.preventDefault();
        this.setState({value: ''});
    }

    likeCommentOnClick = (commentId) => {
        this.props.dispatch(likeComment(commentId));
    }

    removelikeCommentOnClick = (commentId) => {
        this.props.dispatch(removeLikeComment(commentId));
    }

    likeReplyOnClick = (params) => {
        this.props.dispatch(likeReply(params));
    }

    removelikeReplyOnClick = (params) => {
        this.props.dispatch(removeLikeReply(params));
    }

    replyOnClick = (params) => {
        this.props.dispatch(addReply(params));
    }

    renderComments(comments) {
        if (comments.length === 0) {
            return null;
        }

        return (
            <div>
                {
                    comments.length > this.state.viewNumComments ?
                    <span className="comment-view-toggle-comments" onClick={this.viewCommentsOnclick}>
                        {`--- View 3 more comments (${comments.length - this.state.viewNumComments})`}
                    </span> :
                    <span className="comment-view-toggle-comments" onClick={this.hideCommentsOnclick}>
                        {"--- Hide comments"}
                    </span>
                }
                <div>
                    {comments.slice(0,this.state.viewNumComments).map((comment, index) => (
                        <Comment
                            user={comment.user}
                            text={comment.text}
                            replies={comment.replies}
                            numOfLikes={comment.numOfLikes}
                            liked={comment.liked}
                            id={index}
                            key={index}
                            likeCommentOnClickHandler={this.likeCommentOnClick}
                            removelikeCommentOnClickHandler={this.removelikeCommentOnClick}
                            likeReplyOnClickHandler={this.likeReplyOnClick}
                            removelikeReplyOnClickHandler={this.removelikeReplyOnClick}
                            replyOnClick={this.replyOnClick}
                        />
                    ))}
                </div>
            </div>
        );
    }

    render() {
        const { comments } = this.props;
        return (
            <div className="comment-view-container">
                <div className="comment-container">
                    {this.renderComments(comments)}
                </div>
                <div className="action-container">
                    12 Likes
                </div>
                <div className="comment-view-icons">
                    <div className="comment-view-heart"></div>
                    <div className="comment-view-topic"></div>
                    <div className="comment-view-share"></div>
                </div>
                <div className='add-comment-view-container'>
                    <form onSubmit={this.handleSubmit}>
                        <label className="add-post-comment-container-sub">
                            <input
                                className="comment-view-input-fill"
                                type="text"
                                value={this.state.value}
                                placeholder="Add a comment..."
                                onChange={this.handleChange}
                            />
                            <input
                                className="comment-view-post-button"
                                type="submit"
                                value="Post"
                                disabled={!this.state.value}
                            />
                        </label>
                    </form>
                </div>
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
  )(CommentView);
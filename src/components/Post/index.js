import React, { Component } from "react";
import "./Post.css";
import CommentView from '../CommentView/index';
import { connect } from 'react-redux';
import { addComment, likeComment, removeLikeComment } from '../../actions';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewAllComments: false,
            value: '',
            userComments: [],
        }
        this.changeViewState = this.changeViewState.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.likeCommentOnClick = this.likeCommentOnClick.bind(this);
        this.removelikeCommentOnClick = this.removelikeCommentOnClick.bind(this);
    }
    changeViewState() {
        const { viewAllComments } = this.state;
        this.setState({
            viewAllComments: !viewAllComments,
        });
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
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
        this.setState({ value: '' });
    }

    likeCommentOnClick = (commentId) => {
        this.props.dispatch(likeComment(commentId));
    }

    removelikeCommentOnClick = (commentId) => {
        this.props.dispatch(removeLikeComment(commentId));
    }

    render() {
        const { nickname, avatar, image, caption, comments} = this.props;
        const { viewAllComments, userComments } = this.state;
        return (
            <div>
                {viewAllComments ?
                    <article className="Post-alternate" ref="Post-alternate">
                        <div className="Post-image">
                            <img alt={caption} src={image} />
                        </div>
                        <div className="Post-sidebar">
                            <div className="Post-user">
                                <div className="Post-user-avatar">
                                    <img src={avatar} alt={nickname} />
                                </div>
                                <div className="Post-user-nickname">
                                    <span>{nickname}</span>
                                </div>
                            </div>
                            <div className="Post-caption">
                                <strong>{nickname}</strong>{caption}
                            </div>
                            <CommentView />
                        </div>
                    </article>
                    :
                    <article className="Post" ref="Post">
                        <div className="Post-user">
                            <div className="Post-user-avatar">
                                <img src={avatar} alt={nickname} />
                            </div>
                            <div className="Post-user-nickname">
                                <span>{nickname}</span>
                            </div>
                        </div>
                        <div className="Post-image">
                            <img alt={caption} src={image} />
                        </div>
                        <div className="Post-icons">
                            <div className="Post-heart"></div>
                            <div className="Post-topic" onClick={this.changeViewState}></div>
                            <div className="Post-share"></div>
                        </div>
                        <div className="View-container">12 Likes</div>
                        <div className="Post-caption">
                            <strong>{nickname}</strong>{caption}
                        </div>
                        <div className="View-container">
                            <button className="View-all" onClick={this.changeViewState}>View all {comments.length} comments </button>
                        </div>{comments.length > 1 ?  
                        <div className="Post-caption">
                            <div className="list-item"><li className="list"><strong>{comments[comments.length - 2].user}</strong>{comments[comments.length - 2].text}</li>
                            {comments[comments.length - 2].liked ?
                    <span className="like-heart" onClick={this.removelikeCommentOnClick.bind(null, comments.length - 2)}></span>
                    : <span className="unlike-heart" onClick={this.likeCommentOnClick.bind(null, comments.length - 2)}></span>} </div>
                            <div className="list-item"><li className="list"><strong>{comments[comments.length - 1].user}</strong>{comments[comments.length - 1].text}</li>
                            {comments[comments.length - 1].liked ?
                    <span className="like-heart" onClick={this.removelikeCommentOnClick.bind(null, comments.length - 1)}></span>
                    : <span className="unlike-heart" onClick={this.likeCommentOnClick.bind(null, comments.length - 1)}></span>}</div> 
                        </div>
                        :
                        <div></div>
                        }
                        {userComments.length > 0 ? 
                        <div className="Post-caption">{userComments.map(comment => {
                            return <li className="list"><strong>{comment.user}</strong>{comment.text}</li>;
                        })}</div> : <div></div>}
                        <div className='add-post-comment-container'>
                            <form onSubmit={this.handleSubmit}>
                                <label className="add-post-comment-container-subcontainer">
                                    <input
                                        className="input-fill"
                                        type="text"
                                        value={this.state.value}
                                        placeholder="Add a comment..."
                                        onChange={this.handleChange}
                                    />
                                    <input
                                        className="post-button"
                                        type="submit"
                                        value="Post"
                                        disabled={!this.state.value}
                                    />
                                </label>
                            </form>
                        </div>
                    </article>}
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
)(Post);
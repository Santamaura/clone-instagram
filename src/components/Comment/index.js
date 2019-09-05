import React, { Component } from "react";
import "./Comment.css";
import Reply from "../Reply";

class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewNumReplies: 0,
            replyOpen: false,
            value: '',
        };

        this.renderReplies = this.renderReplies.bind(this);
        this.viewRepliesOnclick = this.viewRepliesOnclick.bind(this);
        this.hideRepliesOnclick = this.hideRepliesOnclick.bind(this);
        this.replyButtonOnClick = this.replyButtonOnClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    replyButtonOnClick() {
        this.setState((state) => ({
            replyOpen: !state.replyOpen,
            value: `@${this.props.user}`,
        }));
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    viewRepliesOnclick() {
        this.setState((state) => ({
            viewNumReplies: state.viewNumReplies + 3,
        }));
    }

    hideRepliesOnclick() {
        this.setState({
            viewNumReplies: 0,
        });
    }


    handleSubmit(event) {
        const newReply = {
            user: 'Main user',
            text: this.state.value,
            numOfLikes: 0,
            liked: false,
        };
        const actionProps = { commentId: this.props.id, newReply: newReply };
        this.props.replyOnClick(actionProps);
        event.preventDefault();
        this.setState({ value: '', replyOpen: false });
    }

    renderReplies(replies) {
        if (replies.length === 0) {
            return null;
        }

        if (this.state.viewNumReplies === 0) {
            return (
                <div className="reply-button">
                    <span className="comment-reply-toggle-view comment-align-view" onClick={this.viewRepliesOnclick}>
                        {`--- View replies (${replies.length})`}
                    </span>
                </div>
            );
        }

        return (
            <div>
                {
                    replies.length > this.state.viewNumReplies ?
                        <span className="comment-reply-toggle-view" onClick={this.viewRepliesOnclick}>
                            {`--- View 3 more replies (${replies.length - this.state.viewNumReplies})`}
                        </span> :
                        <span className="comment-reply-toggle-view" onClick={this.hideRepliesOnclick}>
                            {"--- Hide replies"}
                        </span>
                }
                <div>
                    {replies.slice(0, this.state.viewNumReplies).map((reply, index) => (
                        <Reply
                            user={reply.user}
                            text={reply.text}
                            key={index}
                            id={index}
                            likeReplyOnClickHandler={this.props.likeReplyOnClickHandler}
                            removelikeReplyOnClickHandler={this.props.removelikeReplyOnClickHandler}
                            commentId={this.props.id}
                            numOfLikes={reply.numOfLikes}
                            liked={reply.liked}
                            replyOnClick={this.props.replyOnClick}
                        />
                    ))}
                </div>
            </div>
        );
    }

    render() {
        const { user, text, replies, numOfLikes, liked } = this.props;
        console.log(this.props);
        return (
            <div className='comment-body-wrapper'>
                <div className='comment-body'>
                <div className='comment-body-row'>
                    <div className='comment-body-text'>
                    <div className='comment-user'>
                        <strong>{`${user}`}</strong>
                        </div>
                        <div className='comment-text'>
                        {`${text}`} </div>
                    </div>
                    {liked ?
                    <span className="like-heart-alternate" onClick={this.props.removelikeCommentOnClickHandler.bind(null,this.props.id)}></span>
                    : <span className="unlike-heart-alternate" onClick={this.props.likeCommentOnClickHandler.bind(null,this.props.id)}></span>} 
                    </div>
                    <div className='comment-footer'>
                        <div className="comment-likes">{`${numOfLikes} likes`}</div>
                        <span className="comment-reply" onClick={this.replyButtonOnClick}>Reply</span>
                    </div>
                    {replies && replies.length > 0 ? this.renderReplies(replies) : null}
                    {this.state.replyOpen ?
                    <div className="comment-reply-container">
                        <form onSubmit={this.handleSubmit}>
                            <label className="comment-reply-subcontainer">
                                <input
                                    className="comment-reply-input-fill"
                                    type="text"
                                    ref={(ip) => this.myInp = ip}
                                    value={this.state.value}
                                    placeholder="Add a reply..."
                                    onChange={this.handleChange}
                                />
                                <input
                                    className="comment-reply-post-button"
                                    type="submit"
                                    value="Post"
                                    disabled={!this.state.value}
                                />
                            </label>
                        </form> 
                        </div>: null
                    }
                </div>
            </div>

        );
    }
}

export default Comment;
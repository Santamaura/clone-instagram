import React, { Component } from "react";
import "./Reply.css";

class Reply extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { user, text, numOfLikes, liked, id, commentId } = this.props;
        const trackingInfo = {replyId: id, commentId: commentId};
        return (
            <div>
                <div className="user-reply-row"><strong className="user-reply-name">{`${user} `}</strong><div className="user-reply-text">{`${text}`}</div>
                {liked ?
                    <span className="like-heart-reply" onClick={this.props.removelikeReplyOnClickHandler.bind(null,trackingInfo)}></span> 
                    : <span className="unlike-heart-reply" onClick={this.props.likeReplyOnClickHandler.bind(null,trackingInfo)}></span>}</div>
                <div className="user-reply-likes">{`${numOfLikes} likes`}</div>
                
            </div>
        );
    }
}

export default Reply;
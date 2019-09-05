import {
    ADD_COMMENT,
    LIKE_COMMENT,
    REMOVE_LIKE_COMMENT,
    LIKE_REPLY,
    REMOVE_LIKE_REPLY,
    ADD_REPLY,
} from "../actions";

const initialState = {
    comments: [
    {
        user: 'test2',
        text: 'comment text 2',
        numOfLikes: 10,
        liked: false,
        replies: [
            {
                user: 'expended replies',
                text: 'comment reply 2',
                numOfLikes: 1,
                liked: false,
            },
            {
                user: 'test user 4',
                text: 'comment reply 3',
                numOfLikes: 1,
                liked: false,
            },
            {
                user: 'test user 4',
                text: 'comment reply 3',
                numOfLikes: 1,
                liked: false,
            },
            {
                user: 'test user 4',
                text: 'comment reply 3',
                numOfLikes: 1,
                liked: false,
            },
            {
                user: 'test user 4',
                text: 'comment reply 3',
                numOfLikes: 1,
                liked: false,
            },
            {
                user: 'test user 4',
                text: 'comment reply 3',
                numOfLikes: 1,
                liked: false,
            },
            {
                user: 'test user 4',
                text: 'comment reply 3',
                numOfLikes: 1,
                liked: false,
            },
            {
                user: 'test user 4',
                text: 'comment reply 3',
                numOfLikes: 1,
                liked: false,
            },
        ],
    },
    {
        user: 'test3',
        text: 'comment text 3',
        numOfLikes: 0,
        liked: false,
        replies: []
    }],
};

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_COMMENT:
            return Object.assign({}, state, {
                comments: state.comments.concat(action.payload)
            });
        case LIKE_COMMENT:
            return {
                ...state,
                comments: state.comments.map(
                    (comment, id) => id === action.payload ? {
                    ...comment, numOfLikes: comment.numOfLikes + 1, liked: true,
                    } : comment
                )
            }
        case REMOVE_LIKE_COMMENT:
            return {
                ...state,
                comments: state.comments.map(
                    (comment, id) => id === action.payload ? {
                    ...comment, numOfLikes: comment.numOfLikes - 1, liked: false,
                    } : comment
                )
            }
        case LIKE_REPLY:
            let likeReplyId = action.payload.replyId;
            let likeCommentId = action.payload.commentId;
            return {
                ...state,
                comments: state.comments.map(
                    (comment, id) => {
                        if (id === likeCommentId) {
                            return {
                                ...comment, replies: comment.replies.map(
                                    (reply, id2) => id2 === likeReplyId ? {
                                        ...reply, numOfLikes: reply.numOfLikes + 1, liked: true,
                                    } : reply)
                            }
                        } else {
                            return comment;
                        }
                    }
                )
            }
        case REMOVE_LIKE_REPLY:
            let removeReplyId = action.payload.replyId;
            let removeCommentId = action.payload.commentId;
            return {
                ...state,
                comments: state.comments.map(
                    (comment, id) => {
                        if (id === removeCommentId) {
                            return {
                                ...comment, replies: comment.replies.map(
                                    (reply, id2) => id2 === removeReplyId ? {
                                        ...reply, numOfLikes: reply.numOfLikes - 1, liked: false,
                                    } : reply)
                            }
                        } else {
                            return comment;
                        }
                    }
                )
            }
        case ADD_REPLY:
            let addReplyCommentId = action.payload.commentId;
            let addReplyContent = action.payload.newReply;
            return {
                ...state,
                comments: state.comments.map(
                    (comment, id) => {
                        if (id === addReplyCommentId) {
                            return Object.assign({}, comment, {
                                replies: comment.replies.concat(addReplyContent)
                            });
                        } else {
                            return comment;
                        }
                    }
                )
            }
        default:
            return state;
    }
};

export default rootReducer;
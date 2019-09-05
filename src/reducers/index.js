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
        user: 'BradPitt',
        text: 'Definitely check this out',
        numOfLikes: 10,
        liked: false,
        replies: [
            {
                user: 'TonyTone',
                text: 'for sure!',
                numOfLikes: 1,
                liked: false,
            },
            {
                user: 'MovieMan',
                text: '<3 this',
                numOfLikes: 1,
                liked: false,
            },
            {
                user: 'FantasticFox',
                text: 'is it out already?',
                numOfLikes: 1,
                liked: false,
            },
            {
                user: 'JohnWick',
                text: 'nice new Tarantino!',
                numOfLikes: 1,
                liked: false,
            },
            {
                user: 'Bob_Loblaw',
                text: 'no doubt',
                numOfLikes: 1,
                liked: false,
            },
            {
                user: 'ReBobSaget',
                text: 'Hopefully this measures up to other Tarantino movies',
                numOfLikes: 1,
                liked: false,
            },
            {
                user: 'TonyWu1336',
                text: 'what am i doing in here...',
                numOfLikes: 1,
                liked: false,
            },
            {
                user: 'Timothy_Jones_92',
                text: 'hi Brad!!!!',
                numOfLikes: 1,
                liked: false,
            },
        ],
    },
    {
        user: 'akadmiks',
        text: 'Reallll nice poster!',
        numOfLikes: 0,
        liked: false,
        replies: [
            {
                user: 'DonnyYen',
                text: 'damn dj here too!',
                numOfLikes: 3,
                liked: false,
            }
        ]
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
export const ADD_COMMENT = "ADD_COMMENT";
export const LIKE_COMMENT = "LIKE_COMMENT";
export const REMOVE_LIKE_COMMENT = "REMOVE_LIKE_COMMENT";
export const LIKE_REPLY = "LIKE_REPLY";
export const REMOVE_LIKE_REPLY = "REMOVE_LIKE_REPLY";
export const ADD_REPLY = "ADD_REPLY";


export function addComment(payload) {
    return { type: ADD_COMMENT, payload }
};

export function likeComment(payload) {
    return { type: LIKE_COMMENT, payload }
};

export function removeLikeComment(payload) {
    return { type: REMOVE_LIKE_COMMENT, payload }
};

export function likeReply(payload) {
    return { type: LIKE_REPLY, payload }
};

export function removeLikeReply(payload) {
    return { type: REMOVE_LIKE_REPLY, payload }
};

export function addReply(payload) {
    return { type: ADD_REPLY, payload }
};

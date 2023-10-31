import { createSlice } from "@reduxjs/toolkit";
import { currentUser, comments } from "../../data/data.json";

const initialState = {
    modalOpen: false,
    currentUser,
    comments,
    editingReplyId: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // Upvote comments
        upVoteComment: (state, { payload }) => {
            state.comments.forEach((comment) => {
                if (comment.id === payload) {
                    comment.score += 1;
                }
                return;
            });
        },

        // downVote Comments
        downVoteComment: (state, { payload }) => {
            state.comments.forEach((comment) => {
                if (comment.id === payload) {
                    comment.score -= 1;
                }
                return;
            });
        },

        // Upvote Replies
        upVoteReply: (state, { payload }) => {
            state.comments.forEach(({ replies }) => {
                replies.forEach((reply) => {
                    if (reply.id === payload) {
                        reply.score += 1;
                    }
                    return;
                });
            });
        },

        // downVote replies
        downVoteReply: (state, { payload }) => {
            state.comments.forEach(({ replies }) => {
                replies.forEach((reply) => {
                    if (reply.id === payload) {
                        reply.score += 1;
                    }
                    return;
                });
            });
        },

        // Add Comment
        addComment: (state, { payload }) => {
            let highestCommentId = comments.length;
            comments.forEach((comment, i) => {
                if (comment.id[i] > highestCommentId) {
                    highestCommentId = comment.id;
                } else {
                    highestCommentId += 1;
                }
            });

            const newComment = {
                id: highestCommentId,
                content: payload.content,
                createdAt: payload.createdAt,
                score: 0,
                user: currentUser,
                replies: [],
            };

            state.comments.push(newComment);
        },

        // Add Reply
        addReply: (state, { payload }) => {
            state.comments.forEach((comment) => {
                if (comment.id === payload.commentId) {
                    let highestReplyId = 0;
                    comment.replies.forEach((reply) => {
                        if (reply.id > highestReplyId) {
                            highestReplyId = reply.id;
                        }
                    });

                    // Increment the ID for the new reply
                    const newReplyId = highestReplyId + 1;
                    const newReply = {
                        id: newReplyId,
                        content: payload.content,
                        createdAt: payload.createdAt,
                        user: currentUser,
                        score: 0,
                        replyingTo: comment.user.username,
                    };
                    comment.replies.push(newReply);
                }
            });
        },

        // Delete Reply
        deleteReply: (state, { payload }) => {
            const { commentId, replyId } = payload;

            const comment = state.comments.find(
                (comment) => comment.id === commentId
            );

            if (comment) {
                comment.replies = comment.replies.filter(
                    (reply) => reply.id !== replyId
                );
            }
        },

        startEditReply: (state, { payload }) => {
            state.editingReplyId = payload;
        },

        stopEditReply: (state) => {
            state.editingReplyId = null;
        },

        editReply: (state, { payload }) => {
            const { commentId, replyId, content } = payload;
            const comment = state.comments.find(
                (comment) => comment.id === commentId
            );
            if (comment) {
                const reply = comment.replies.find(
                    (reply) => reply.id === replyId
                );
                if (reply) {
                    reply.content = content;
                }
            }
        },

        openModal: (state) => {
            state.modalOpen = true;
        },

        closeModal: (state) => {
            state.modalOpen = false;
        },
    },
});

export const {
    upVoteComment,
    downVoteComment,
    upVoteReply,
    downVoteReply,
    addComment,
    addReply,
    deleteReply,
    editReply,
    openModal,
    closeModal,
    startEditReply,
    stopEditReply,
} = userSlice.actions;
export default userSlice.reducer;

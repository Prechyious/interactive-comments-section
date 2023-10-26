import { createSlice } from "@reduxjs/toolkit";
import { currentUser, comments } from "../../data/data.json";

const initialState = {
    isLoading: true,
    currentUser,
    comments,
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

        // down
        downVoteComment: (state, { payload }) => {
            state.comments.forEach((comment) => {
                if (comment.id === payload) {
                    comment.score -= 1;
                }
                return;
            });
        },

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
    },
});

export const { upVoteComment, downVoteComment, upVoteReply, downVoteReply } =
    userSlice.actions;
export default userSlice.reducer;

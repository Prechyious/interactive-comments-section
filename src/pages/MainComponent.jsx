import { useDispatch, useSelector } from "react-redux";
import {
    upVoteComment,
    downVoteComment,
    upVoteReply,
    downVoteReply,
    addReply,
    deleteReply,
    startEditReply,
    deleteComment,
    startEditComment,
    openModal,
} from "../features/user/userSlice";
import { useState } from "react";
import Comment from "../components/Comment";
import Replies from "../components/Replies";
import ReplyForm from "../components/ReplyForm";
import DeleteCommentModal from "../components/DeleteCommentModal";

const MainComponent = () => {
    const {
        currentUser,
        comments,
        editingReplyId,
        editingCommentId,
        modalOpen,
    } = useSelector((store) => store.user);

    const [selectedReplyCommentId, setSelectedReplyCommentId] = useState(null);
    const [replyUser, setReplyUser] = useState("");
    const [replyContent, setReplyContent] = useState("");
    const [deleteType, setDeleteType] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    const dispatch = useDispatch();

    const toggleReplyBox = (commentId, username) => {
        setSelectedReplyCommentId((prevId) =>
            prevId === commentId ? null : commentId
        );
        setReplyUser(username);
        setReplyContent(`@${username}, `);
    };
    // console.log(comments);
    const submitReply = (content, commentId) => {
        dispatch(
            addReply({
                content,
                user: currentUser,
                createdAt: "today",
                score: 0,
                commentId,
            })
        );
        setReplyUser("");
        setReplyContent("");
        setSelectedReplyCommentId(null);
    };

    const toggleDeleteModal = (type, id) => {
        setDeleteType(type);
        setDeleteId(id);
        dispatch(openModal());
    };

    return (
        <>
            {comments.map((comment) => (
                <section key={comment.id}>
                    <Comment
                        key={comment.id}
                        comment={comment}
                        toggleReplyBox={toggleReplyBox}
                        upVote={() => dispatch(upVoteComment(comment.id))}
                        downVote={() => dispatch(downVoteComment(comment.id))}
                        currentUser={currentUser}
                        toggleDeleteModal={() =>
                            toggleDeleteModal("comment", comment.id)
                        }
                        editingCommentId={editingCommentId}
                        startEditing={() =>
                            dispatch(startEditComment(comment.id))
                        }
                    />

                    {/* Replying Input */}
                    {selectedReplyCommentId === comment.id && (
                        <ReplyForm
                            currentUser={currentUser}
                            selectedReplyCommentId={selectedReplyCommentId}
                            onSubmit={submitReply}
                            replyUser={replyUser}
                            replyContent={replyContent}
                            setReplyUser={setReplyUser}
                            setReplyContent={setReplyContent}
                            startEditing={() =>
                                dispatch(startEditReply(comment.id))
                            }
                        />
                    )}

                    {/* Replies */}
                    {comment.replies &&
                        comment.replies.map((reply) => (
                            <Replies
                                key={reply.id}
                                replies={reply}
                                currentUser={currentUser}
                                upVote={() => dispatch(upVoteReply(reply.id))}
                                downVote={() =>
                                    dispatch(downVoteReply(reply.id))
                                }
                                deleteReply={() =>
                                    dispatch(
                                        deleteReply({
                                            commentId: comment.id,
                                            replyId: reply.id,
                                        })
                                    )
                                }
                                editingReplyId={editingReplyId}
                                startEditing={() =>
                                    dispatch(startEditReply(reply.id))
                                }
                                commentId={comment.id}
                                toggleReplyBox={toggleReplyBox}
                                toggleDeleteModal={() =>
                                    toggleDeleteModal("reply", {
                                        commentId: comment.id,
                                        replyId: reply.id,
                                    })
                                }
                            />
                        ))}
                </section>
            ))}
            {modalOpen && (
                <DeleteCommentModal
                    type={deleteType}
                    deleteComment={() =>
                        dispatch(deleteComment({ commentId: deleteId }))
                    }
                    deleteReply={() => dispatch(deleteReply(deleteId))}
                />
            )}
        </>
    );
};

export default MainComponent;

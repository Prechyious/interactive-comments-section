import { FaPlus, FaMinus, FaReply, FaTrash, FaPen } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { editComment, stopEditComment } from "../features/user/userSlice";
import { useState } from "react";

const Comment = ({
    comment,
    toggleReplyBox,
    upVote,
    downVote,
    currentUser,
    startEditing,
    editingCommentId,
    toggleDeleteModal,
}) => {
    const { content, createdAt, score, user, id } = comment;
    const dispatch = useDispatch();
    const [editedContent, setEditedContent] = useState(content);

    const handleEditContentChange = (value) => {
        setEditedContent(value);
    };

    const handleSaveEdit = () => {
        dispatch(
            editComment({
                commentId: id,
                content: editedContent,
            })
        );

        dispatch(stopEditComment());
    };

    return (
        <article className="flex w-full gap-5 p-4 mx-auto mb-4 bg-white rounded-lg shadow-sm md:px-5 text-lightGray">
            <aside className="hidden md:flex flex-col items-center gap-4 py-1.5 px-2 font-medium rounded-lg text-lightGrayishBlue bg-veryLightGray h-fit mx-auto">
                <button
                    className="duration-300 hover:text-moderateBlue"
                    onClick={upVote}
                >
                    <FaPlus size={11} />
                </button>
                <p className="w-4 text-sm text-center text-moderateBlue">
                    {score}
                </p>
                <button
                    className="duration-300 hover:text-moderateBlue"
                    onClick={downVote}
                >
                    <FaMinus size={11} />
                </button>
            </aside>
            <section className="flex-1">
                <header className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-4">
                        <img
                            className="w-8 h-8"
                            src={user.image.webp}
                            alt={user.username}
                        />
                        <h1 className="font-medium text-darkBlue">
                            {user.username}
                        </h1>
                        {currentUser.username === user.username && (
                            <p className="px-1 mx-1 text-sm rounded-sm bg-moderateBlue md:text-base">
                                you
                            </p>
                        )}
                        <p className="text-grayishBlue">{createdAt}</p>
                    </div>
                    <div className="hidden gap-4 md:inline-flex">
                        {currentUser.username === user.username && (
                            <button
                                className="flex items-center gap-1.5 text-softRed hover:text-paleRed duration-300 font-medium"
                                onClick={toggleDeleteModal}
                            >
                                <FaTrash size={13} />
                                <p>Delete</p>
                            </button>
                        )}
                        {currentUser.username === user.username ? (
                            <button
                                className="flex items-center gap-1.5 text-moderateBlue hover:text-lightGrayishBlue duration-300 font-medium"
                                onClick={startEditing}
                            >
                                <FaPen size={14} />
                                <p>Edit</p>
                            </button>
                        ) : (
                            <button
                                className="flex items-center gap-1.5 text-moderateBlue hover:text-lightGrayishBlue duration-300 font-medium"
                                onClick={() =>
                                    toggleReplyBox(id, user.username)
                                }
                            >
                                <FaReply size={14} />
                                <p>Reply</p>
                            </button>
                        )}
                    </div>
                </header>
                {editingCommentId === id ? (
                    <div className="flex flex-col w-full gap-4">
                        <textarea
                            className="textarea"
                            name="editComment"
                            id="editComment"
                            value={editedContent}
                            onChange={(e) =>
                                handleEditContentChange(e.target.value)
                            }
                        ></textarea>
                        <button
                            onClick={() => handleSaveEdit()}
                            className="hidden px-3 py-1.5 text-white uppercase border-none rounded-lg sm:block bg-moderateBlue hover:bg-lightGrayishBlue focus:outline-offset-1 focus:outline self-end duration-300 ease-out"
                        >
                            Update
                        </button>
                    </div>
                ) : (
                    <p className="mb-4 text-grayishBlue">{content}</p>
                )}

                {/* Mobile Design */}
                <div className="flex items-center justify-between w-full">
                    <aside className="flex gap-2.5 font-bold rounded-lg md:hidden py-1 px-2 bg-veryLightGray text-lightGrayishBlue">
                        <button
                            className="duration-300 hover:text-moderateBlue"
                            onClick={upVote}
                        >
                            <FaPlus size={11} />
                        </button>
                        <p className="w-4 text-sm text-center text-moderateBlue">
                            {score}
                        </p>
                        <button
                            className="duration-300 hover:text-moderateBlue"
                            onClick={downVote}
                        >
                            <FaMinus size={11} />
                        </button>
                    </aside>

                    <div className="inline-flex gap-3 md:gap-4 md:hidden">
                        {currentUser.username === user.username && (
                            <button
                                className="flex items-center gap-1 md:gap-1.5 text-softRed hover:text-paleRed duration-300 font-medium disabled:text-paleRed"
                                onClick={toggleDeleteModal}
                                disabled={editingCommentId !== null}
                            >
                                <FaTrash size={13} />
                                <p>Delete</p>
                            </button>
                        )}
                        {currentUser.username === user.username ? (
                            <button
                                className="flex items-center gap-1 md:gap-1.5 text-moderateBlue hover:text-lightGrayishBlue duration-300 font-medium disabled:text-lightGrayishBlue"
                                onClick={startEditing}
                                disabled={editingCommentId !== null}
                            >
                                <FaPen size={14} />
                                <p>Edit</p>
                            </button>
                        ) : (
                            <button
                                className="flex items-center gap-1 md:gap-1.5 text-moderateBlue hover:text-lightGrayishBlue duration-300 font-medium"
                                onClick={() =>
                                    toggleReplyBox(id, user.username)
                                }
                            >
                                <FaReply size={14} />
                                <p>Reply</p>
                            </button>
                        )}
                    </div>
                </div>
            </section>
        </article>
    );
};

export default Comment;

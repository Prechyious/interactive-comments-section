import { FaPlus, FaMinus, FaTrash, FaPen, FaReply } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { editReply, stopEditReply } from "../features/user/userSlice";
import { useState } from "react";

const Replies = ({
    replies,
    currentUser,
    upVote,
    downVote,
    startEditing,
    editingReplyId,
    toggleReplyBox,
    commentId,
    toggleDeleteModal,
}) => {
    const dispatch = useDispatch();
    const [editedContent, setEditedContent] = useState(replies.content);

    const handleEditContentChange = (value) => {
        setEditedContent(value);
    };

    const handleSaveEdit = () => {
        dispatch(
            editReply({
                commentId: commentId,
                replyId: replies.id,
                content: editedContent,
            })
        );

        dispatch(stopEditReply());
    };
    return (
        <article className="px-5 flex float-right w-[95%] gap-5 p-4 mb-4 bg-white rounded-lg shadow-sm md:w-[36rem] text-lightGray">
            <aside className="hidden md:flex flex-col items-center gap-4 py-1.5 px-2 font-medium rounded-lg text-lightGrayishBlue bg-veryLightGray h-fit mx-auto">
                <button
                    className="duration-300 hover:text-moderateBlue"
                    onClick={upVote}
                >
                    <FaPlus size={11} />
                </button>
                <p className="w-4 text-sm text-center text-moderateBlue">
                    {replies.score}
                </p>
                <button
                    className="duration-300 hover:text-moderateBlue"
                    onClick={downVote}
                >
                    <FaMinus size={11} />
                </button>
            </aside>
            <div className="flex-1">
                <header className="flex items-center justify-between mb-2">
                    <div
                        className={`flex items-center md:gap-4 ${
                            currentUser.username === replies.user.username
                                ? "gap-1"
                                : "gap-2"
                        }`}
                    >
                        <img
                            className={`w-8 h-8 ${
                                currentUser.username ===
                                    replies.user.username && "mr-1"
                            }`}
                            src={replies.user.image.webp}
                            alt={replies.user.username}
                        />
                        <h1 className="font-medium text-darkBlue">
                            {replies.user.username}
                        </h1>
                        {currentUser.username === replies.user.username && (
                            <p className="px-1 mx-1 text-sm rounded-sm bg-moderateBlue md:text-base">
                                you
                            </p>
                        )}

                        <p className="text-[15px] text-grayishBlue md:text-base">
                            {replies.createdAt}
                        </p>
                    </div>
                    <div className="hidden gap-4 md:inline-flex">
                        {currentUser.username === replies.user.username && (
                            <button
                                className="flex items-center gap-1.5 text-softRed hover:text-paleRed duration-300 font-medium"
                                onClick={toggleDeleteModal}
                            >
                                <FaTrash size={13} />
                                <p>Delete</p>
                            </button>
                        )}
                        {currentUser.username === replies.user.username ? (
                            <button
                                className="flex items-center gap-1.5 text-moderateBlue hover:text-lightGrayishBlue duration-300 font-medium"
                                onClick={startEditing}
                            >
                                <FaPen size={14} />
                                <p>Edit</p>
                            </button>
                        ) : (
                            <button className="flex items-center gap-1.5 text-moderateBlue hover:text-lightGrayishBlue duration-300 font-medium">
                                <FaReply size={14} />
                                <p>Reply</p>
                            </button>
                        )}
                    </div>
                </header>
                {editingReplyId === replies.id ? (
                    <div className="flex flex-col w-full gap-4">
                        <textarea
                            className="textarea"
                            name="editComment"
                            id="editComment"
                            value={`@${replies.replyingTo}, ${editedContent}`}
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
                    <p className="mb-4 text-grayishBlue">
                        <span className="font-bold text-moderateBlue">
                            @{replies.replyingTo}
                        </span>{" "}
                        {replies.content}
                    </p>
                )}

                {/* Mobile */}
                <div className="flex items-center justify-between mt-2 md:hidden">
                    <aside className="flex items-center gap-4 py-1.5 px-2 font-medium rounded-lg text-lightGrayishBlue bg-veryLightGray h-fit">
                        <button
                            className="duration-300 hover:text-moderateBlue"
                            onClick={upVote}
                        >
                            <FaPlus size={11} />
                        </button>
                        <p className="w-4 text-sm text-center text-moderateBlue">
                            {replies.score}
                        </p>
                        <button
                            className="duration-300 hover:text-moderateBlue"
                            onClick={downVote}
                        >
                            <FaMinus size={11} />
                        </button>
                    </aside>
                    <div className="inline-flex gap-3 md:gap-4">
                        {currentUser.username === replies.user.username && (
                            <button
                                className="flex items-center gap-1 md:gap-1.5 text-softRed hover:text-paleRed duration-300 font-medium disabled:text-paleRed"
                                onClick={toggleDeleteModal}
                                disabled={editingReplyId !== null}
                            >
                                <FaTrash size={13} />
                                <p>Delete</p>
                            </button>
                        )}
                        {currentUser.username === replies.user.username ? (
                            <button
                                className="flex items-center gap-1 md:gap-1.5 text-moderateBlue hover:text-lightGrayishBlue duration-300 font-medium disabled:text-lightGrayishBlue"
                                onClick={startEditing}
                                disabled={editingReplyId !== null}
                            >
                                <FaPen size={14} />
                                <p>Edit</p>
                            </button>
                        ) : (
                            <button className="flex items-center gap-1 md:gap-1.5 text-moderateBlue hover:text-lightGrayishBlue duration-300 font-medium">
                                <FaReply size={14} />
                                <p>Reply</p>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
};

export default Replies;

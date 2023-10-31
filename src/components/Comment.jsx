import { FaPlus, FaMinus, FaReply } from "react-icons/fa";

const Comment = ({ comment, toggleReplyBox, upVote, downVote }) => {
    const { content, createdAt, score, user, id } = comment;
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
                        <p className="text-grayishBlue">{createdAt}</p>
                    </div>
                    <button
                        className="hidden md:flex items-center gap-1.5 text-moderateBlue hover:text-lightGrayishBlue duration-300 font-medium"
                        onClick={() => toggleReplyBox(id, user.username)}
                    >
                        <FaReply size={14} />
                        <p>Reply</p>
                    </button>
                </header>
                <p className="mb-4 text-grayishBlue">{content}</p>
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

                    <button
                        className="md:hidden flex items-center gap-1.5 text-moderateBlue hover:text-lightGrayishBlue duration-300 font-medium"
                        onClick={() => toggleReplyBox(id, user.username)}
                    >
                        <FaReply size={14} />
                        <p>Reply</p>
                    </button>
                </div>
            </section>
        </article>
    );
};

export default Comment;

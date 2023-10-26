import { useDispatch, useSelector } from "react-redux";
import plusIcon from "../assets/images/icon-plus.svg";
import minusIcon from "../assets/images/icon-minus.svg";
import replyIcon from "../assets/images/icon-reply.svg";
import deleteIcon from "../assets/images/icon-delete.svg";
import {
    downVoteComment,
    downVoteReply,
    upVoteComment,
    upVoteReply,
} from "../features/user/userSlice";

const Comments = () => {
    const { currentUser, comments } = useSelector((store) => store.user);

    const dispatch = useDispatch();

    return (
        <main className="flex flex-col items-center h-[100dvh] md:h-screen justify-center max-w-2xl mx-auto">
            {comments.map(
                ({ content, createdAt, id, score, user, replies }) => (
                    <>
                        <article
                            key={id}
                            className="flex gap-5 p-4 mb-4 bg-white rounded-lg shadow-sm md:max-w-2xl text-lightGray"
                        >
                            <aside className="flex flex-col items-center gap-4 py-1.5 px-2 font-medium rounded-lg text-moderateBlue bg-veryLightGray h-fit mx-auto">
                                <button
                                    onClick={() => dispatch(upVoteComment(id))}
                                >
                                    <img src={plusIcon} alt="upvote" />
                                </button>
                                <p className="w-4 text-sm text-center">
                                    {score}
                                </p>
                                <button
                                    onClick={() =>
                                        dispatch(downVoteComment(id))
                                    }
                                >
                                    <img src={minusIcon} alt="downvote" />
                                </button>
                            </aside>
                            <div>
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
                                        <p className="text-grayishBlue">
                                            {createdAt}
                                        </p>
                                    </div>
                                    <button className="flex items-center gap-1.5 text-moderateBlue font-medium">
                                        <img src={replyIcon} alt="reply" />
                                        <p>Reply</p>
                                    </button>
                                </header>
                                <p className="text-grayishBlue">{content}</p>
                            </div>
                        </article>

                        {/* Replies */}
                        {replies &&
                            replies.map((reply) => (
                                <article
                                    key={reply.id}
                                    className="flex self-end gap-5 p-4 mb-4 bg-white rounded-lg shadow-sm md:max-w-xl text-lightGray"
                                >
                                    <aside className="flex flex-col items-center gap-4 py-1.5 px-2 font-medium rounded-lg text-moderateBlue bg-veryLightGray h-fit mx-auto">
                                        <button
                                            onClick={() =>
                                                dispatch(upVoteReply(reply.id))
                                            }
                                        >
                                            <img src={plusIcon} alt="upvote" />
                                        </button>
                                        <p className="w-4 text-sm text-center">
                                            {reply.score}
                                        </p>
                                        <button
                                            onClick={() =>
                                                dispatch(
                                                    downVoteReply(reply.id)
                                                )
                                            }
                                        >
                                            <img
                                                src={minusIcon}
                                                alt="downvote"
                                            />
                                        </button>
                                    </aside>
                                    <div>
                                        <header className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    className="w-8 h-8"
                                                    src={reply.user.image.webp}
                                                    alt={reply.user.username}
                                                />
                                                <h1 className="font-medium text-darkBlue">
                                                    {reply.user.username}
                                                </h1>
                                                {currentUser.username ===
                                                    reply.user.username && (
                                                    <p className="px-1 rounded-sm bg-moderateBlue">
                                                        you
                                                    </p>
                                                )}
                                                <p className="text-grayishBlue">
                                                    {reply.createdAt}
                                                </p>
                                            </div>
                                            <div className="inline-flex gap-4">
                                                <button className="flex items-center gap-1.5 text-softRed font-medium">
                                                    <img
                                                        src={deleteIcon}
                                                        alt="delete"
                                                    />
                                                    <p>Delete</p>
                                                </button>
                                                <button className="flex items-center gap-1.5 text-moderateBlue font-medium">
                                                    <img
                                                        src={replyIcon}
                                                        alt="reply"
                                                    />
                                                    <p>Reply</p>
                                                </button>
                                            </div>
                                        </header>
                                        <p className="text-grayishBlue">
                                            <span className="font-bold text-moderateBlue">
                                                @{reply.replyingTo}
                                            </span>{" "}
                                            {reply.content}
                                        </p>
                                    </div>
                                </article>
                            ))}
                    </>
                )
            )}
        </main>
    );
};

export default Comments;

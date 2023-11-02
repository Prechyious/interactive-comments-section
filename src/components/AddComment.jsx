import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../features/user/userSlice";

const AddComment = () => {
    const { currentUser } = useSelector((store) => store.user);
    const [comment, setComment] = useState("");

    const dispatch = useDispatch();

    const handleAddComment = (e) => {
        e.preventDefault();

        if (comment.trim() !== "") {
            dispatch(
                addComment({
                    content: comment,
                    createdAt: "today",
                    user: currentUser,
                    replies: [],
                })
            );
        }
        setComment("");
    };
    return (
        <footer className="relative bottom-0 flex w-full bg-white border-t rounded-lg min-h-fit sm:max-w-xl md:max-w-2xl md:mx-auto">
            <form
                action=""
                className="flex flex-col items-start justify-center w-full p-4 rounded-lg gap-x-5 gap-y-2.5 sm:flex-row"
                onSubmit={handleAddComment}
            >
                <img
                    className="hidden w-8 h-8 sm:block"
                    src={currentUser.image.webp}
                    alt={currentUser.username}
                />

                <textarea
                    className="w-full p-1.5 duration-300 border rounded-lg border-lightGray hover:border-moderateBlue bg-transparent focus:border focus:border-moderateBlue focus:outline-none text-darkBlue h-[4.5rem] md:h-16 placeholder:text-grayishBlue"
                    name="newComment"
                    id="newComment"
                    value={comment}
                    placeholder="Add a comment..."
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <button
                    className="hidden px-4 py-2 text-white uppercase duration-300 ease-out border-none rounded-lg sm:block bg-moderateBlue hover:bg-lightGrayishBlue focus:outline-offset-1 focus:outline"
                    aria-label="send comment"
                >
                    Send
                </button>

                <div className="flex items-center justify-between w-full sm:hidden">
                    <img
                        className="w-8 h-8"
                        src={currentUser.image.webp}
                        alt={currentUser.username}
                    />
                    <button
                        className="px-4 py-2 text-white uppercase border-none rounded-lg bg-moderateBlue hover:bg-lightGrayishBlue focus:outline-offset-1 focus:outline"
                        aria-label="add new comment"
                    >
                        Send
                    </button>
                </div>
            </form>
        </footer>
    );
};

export default AddComment;

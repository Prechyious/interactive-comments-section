import { useDispatch } from "react-redux";
import { closeModal } from "../features/user/userSlice";

const DeleteCommentModal = ({ type, deleteComment, deleteReply }) => {
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        dispatch(closeModal());
    };

    const handleDelete = () => {
        if (type === "comment") {
            deleteComment();
        } else if (type === "reply") {
            deleteReply();
        }
        handleCloseModal();
    };

    return (
        <div
            className="fixed z-10 inset-0 flex items-center justify-center w-full h-[100svh] bg-black/30 transition-all duration-300 ease-in-out"
            onClick={handleCloseModal}
        >
            <main className="flex flex-col max-w-[19rem] gap-4 p-5 mx-auto bg-white rounded-xl text-darkBlue h-fit">
                <header className="font-bold">
                    <h1>Delete Comment</h1>
                </header>

                <p className="text-grayishBlue">
                    Are you sure you want to delete this comment? This will
                    remove the comment and can't be undone.
                </p>

                <div className="flex items-center justify-between">
                    <button
                        className="px-3.5 py-1 text-white uppercase bg-gray-600 hover:bg-gray-400 duration-300 ease-in-out rounded-lg"
                        onClick={handleCloseModal}
                    >
                        No, Cancel
                    </button>
                    <button
                        className="px-3.5 py-1 text-white uppercase rounded-lg bg-softRed hover:bg-paleRed duration-300 ease-in-out"
                        onClick={() => {
                            if (type === "comment") {
                                deleteComment();
                            } else if (type === "reply") {
                                deleteReply();
                            }
                            handleCloseModal();
                        }}
                    >
                        Yes, Delete
                    </button>
                </div>
            </main>
        </div>
    );
};

export default DeleteCommentModal;

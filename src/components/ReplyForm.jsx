const ReplyForm = ({
    currentUser,
    selectedReplyCommentId,
    onSubmit,
    replyContent,
    replyUser,
    setReplyContent,
    setReplyUser,
}) => {
    const submitReply = (e) => {
        e.preventDefault();

        const cleanedContent = replyContent.replace(`@${replyUser}, `, "");
        onSubmit(cleanedContent, selectedReplyCommentId);
        setReplyUser("");
        setReplyContent("");
    };
    return (
        <form
            onSubmit={submitReply}
            className="flex items-start w-full gap-5 p-4 mt-2 mb-4 bg-white rounded-lg"
        >
            <img
                className="w-8 h-8"
                src={currentUser.image.webp}
                alt={currentUser.username}
            />
            <textarea
                className="w-full p-2 duration-300 border rounded-lg border-moderateBlue focus:border focus:border-moderateBlue focus:outline-none text-darkBlue"
                name="reply-box"
                id="reply-box"
                rows="2"
                placeholder={`@${replyUser}`}
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
            />
            <button className="px-4 py-2 text-white uppercase border-none rounded-lg bg-moderateBlue hover:bg-lightGrayishBlue focus:outline-offset-1 focus:outline">
                Reply
            </button>
        </form>
    );
};

export default ReplyForm;

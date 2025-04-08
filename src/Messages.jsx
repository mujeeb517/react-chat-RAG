
function Messages({ chats }) {
    return (<div className="min-h-[400px] overflow-y-auto">
        {chats.map((chat, index) => (
            <div key={index} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'} p-4`}>
                <div className={`${chat.role === 'system' ? 'bg-gray-200' : 'bg-blue-200'} text-gray-900 px-4 p-2 rounded-md max-w-[80%]`}>
                    {chat.content}
                </div>
            </div>
        ))}
    </div>);
}

export default Messages;
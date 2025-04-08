import React, { useState } from "react";
import getResponse from "./rag";
import Spinner from "./Spinner";
import Messages from "./Messages";

const ChatBox = () => {
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [chats, setChats] = useState([{
        role: 'system',
        content: `Hi, there I can help you with movie recommendations?`
    }]);

    const send = async () => {
        if (!msg) return;
        setLoading(true);
        try {
            const userMsg = {
                role: 'user',
                content: msg
            };
            const newChats = [...chats, userMsg];
            setChats(newChats);
            setMsg("");

            const res = await getResponse(msg);
            const sysMsg = {
                role: 'system',
                content: res
            };
            const allChats = [...newChats, sysMsg];

            setChats(allChats);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 rounded-md shadow-md bg-white flex flex-col h-[500px]">
            <Messages chats={chats} />

            <div className="p-3 border-t border-gray-300 bg-white flex items-center gap-2">
                <input
                    value={msg}
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 rounded"
                    onChange={(e) => setMsg(e.target.value)}
                />
                <button onClick={send} disabled={loading} className="flex space-x-1 bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-300 hover:bg-green-600 transition">
                    {loading && <Spinner />}
                    <span>Send</span>
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
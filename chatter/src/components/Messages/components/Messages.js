import React, { useContext, useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import useSound from "use-sound";
import config from "../../../config";
import LatestMessagesContext from "../../../contexts/LatestMessages/LatestMessages";
import TypingMessage from "./TypingMessage";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";
import "../styles/_messages.scss";
import INITBOTTYMESSAGE from "../../../common/constants/initialBottyMessage";

const socket = io(config.BOT_SERVER_ENDPOINT, {
	transports: ["websocket", "polling", "flashsocket"],
});
const INITILMESSAGE = {
	message: INITBOTTYMESSAGE,
	id: Date.now(),
	user: "bot",
};
function Messages() {
	const [myMessage, setMyMessage] = useState("");
	const [messageLists, setMessageLists] = useState([INITILMESSAGE]);
	const [isBottyTyping, setIsBottyTyping] = useState(false);
	const [playSend] = useSound(config.SEND_AUDIO_URL);
	const [playReceive] = useSound(config.RECEIVE_AUDIO_URL);
	const { setLatestMessage } = useContext(LatestMessagesContext);

	useEffect(() => {
		socket.off("bot-message");
		socket.on("bot-message", (bottyMessage) => {
			setMessageLists([
				...messageLists,
				{ message: bottyMessage, user: "bot", id: Date.now() },
			]);
			setLatestMessage("bot", bottyMessage);
			setIsBottyTyping(false);
			playReceive();
		});
		return () => {};
	}, [messageLists, playReceive]);

	useEffect(() => {
		document.getElementById("user-message-input").focus();

		socket.on("bot-typing", () => {
			setIsBottyTyping(true);
		});
	}, [isBottyTyping]);

	const sendMessage = useCallback(() => {
		setMessageLists([
			...messageLists,
			{ message: myMessage, id: Date.now(), user: "IAM" },
		]);
		setLatestMessage("IAM", myMessage);
		playSend();
		socket.emit("user-message", myMessage);
		document.getElementById("user-message-input").value = "";
	}, [messageLists, myMessage, playSend, setLatestMessage]);
	const handleChange = (event) => {
		setMyMessage(event.target.value);
	};
	return (
		<div className='messages'>
			<Header />
			<div className='messages__list' id='message-list'>
				{messageLists.map((mes, index) => {
					return <Message message={mes} botTyping={isBottyTyping} />;
				})}
				{isBottyTyping && <TypingMessage />}
			</div>
			<Footer
				message={myMessage}
				sendMessage={sendMessage}
				onChangeMessage={handleChange}
			/>
		</div>
	);
}

export default Messages;

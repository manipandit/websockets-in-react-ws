import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState("");
  const [latestMessage, setLatestMessage] = useState("");

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");

    newSocket.onopen = () => {
      console.log("Connection established");
      setSocket(newSocket);
      newSocket.send("Hello Server!");
    };

    newSocket.onmessage = (message) => {
      console.log("Message received:", message.data);
      setLatestMessage(message.data);
    };

    return () => newSocket.close();
  }, []);

  return (
    <>
      <input type="text" onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => socket?.send(message)}>send</button>
      {latestMessage}
    </>
  );
}

export default App;

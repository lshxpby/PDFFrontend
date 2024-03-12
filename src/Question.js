import React, { useState } from "react";
import "./Question.css";
export default function Question() {
  const [inputText, setInputText] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission behavior
      const question = inputText.trim();

      try {
        const response = await fetch("http://127.0.0.1:8000/ask-question/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question }),
        });

        if (response.ok) {
          const data = await response.json();
          setChatHistory([
            ...chatHistory,
            { question: data.response.question, answer: data.response.answer },
          ]);
          setInputText(""); // Clear the input field
        } else {
          console.error("Failed to send question");
        }
      } catch (error) {
        console.error("Error sending question:", error);
      }
    }
  };

  return (
    <div id="questionhere">
      <div className="chatHistory">
        {chatHistory.map((item, index) => (
          <div key={index} className="chatItem">
            <p className="question">Question: {item.question}</p>
            <p className="answer">Response: {item.answer}</p>
          </div>
        ))}
      </div>
      <div className="questionbar">
        <input
          id="inputquestion"
          placeholder="Send a message..."
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
}

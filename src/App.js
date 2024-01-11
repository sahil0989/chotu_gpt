import { GoogleGenerativeAI } from "@google/generative-ai";
import { FaRobot } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import Markdown from "react-markdown";
import { useState } from "react";

function App() {
  const API_KEY = "AIzaSyArzl7Zfj9klo56WD7WPpkiWrvoZxWtLuo";
  const [data, setData] = useState(undefined);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");

  async function fetchDataFromGeminiProAPI() {
    try {
      if (!inputText) {
        alert("Please enter text!");
        return;
      }
      setLoading(true);
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const result = await model.generateContent(inputText);
      const text = result.response.text();
      setLoading(false);
      setData(text);
      setQuestion(inputText);
      setInputText("");
    } catch (error) {
      setLoading(false);
      console.error("fetchDataFromGeminiAPI error: ", error);
    }
  }

  return (
    <>
      <h1 className="text-4xl font-bold bg-[#222222] top-0 py-5 px-24 text-white mb-10 fixed w-full">Chootu GPT</h1>
      <div className="mx-24 mt-28 text-white">

        <div className="card mb-2">
          <input
            type="text"
            className="b border-b-2 pb-1 focus:outline-none"
            placeholder="Enter your Query"
            style={{ width: 400 }}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          {" | "}
          <button
            className=" bg-[#999999] px-4 py-2 rounded-lg mb-2"
            disabled={loading}
            onClick={() => fetchDataFromGeminiProAPI()}
          >
            {loading ? "Loading..." : "Get Your Data"}
          </button>
          <div className="flex items-center gap-4 self-center mt-4">
            <FaUser className="scale-[150%]" />
            <Markdown className="w-full">{question}</Markdown>
          </div>
          <div className="flex items-start gap-4 self-center mt-8">
            <FaRobot className="scale-[150%]" />
            <Markdown className="w-full">{data}</Markdown>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
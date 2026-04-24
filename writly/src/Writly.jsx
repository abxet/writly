import { useState } from "react";
import logo from "./assets/writly.svg"
import { FiCopy, FiCheck } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { WiStars } from "react-icons/wi";
import { PiListStar } from "react-icons/pi";

function Writly() {
  const [inputText, setInputText] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // clear text
  const clearText = () => {
    setInputText("");
    setOutput("");
  }

  // copy text 
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
}

  // handling the Button click
  const handleAI = async (type) => {
    // if no input do nothing
    if (!inputText) return;
    // loading
    setLoading(true);
    // clear prev output
    setOutput("");

    try {
      // fetch response from api
      const res = await fetch("https://writly.onrender.com/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: inputText,
          type,
        }),
      });
      // convert res to json
      const data = await res.json();
      // set new output
      setOutput(data.result);
    } catch (err) {
      console.error(err);
      setOutput("Error occurred");
    }
    
    setLoading(false);
  };

  return (
    <div 
    className="bg-neutral-900 text-gray-200 h-screen p-3 w-screen"
    >
      <h1 className="flex justify-center items-center m-4 ">
        <img 
        src={logo} 
        alt="Writly logo"
        className="h-20 rounded-full"
        />
        <div>
        <div 
         className="font-dancing text-5xl mx-3"
        >
            Writly 
        </div>
        <div
         className="font-roboto m-2"
        >
            AI Writing Assistant
        </div>
        </div>
      </h1>

      {/* Input */}
      <div
        className="w-full flex justify-center "
      >
        
        <div 
         className="bg-neutral-950  rounded-2xl p-3 outline-0 "
        >

            <div
         className="flex justify-between "
        >
            <h1
             className="p-2 text-neutral-600 font-roboto"
            >
                Text
            </h1> 
            <button
             onClick={clearText}
             className="p-3 text-neutral-700 hover:bg-neutral-900 rounded-full hover:scale-100 transition"
            >
              {inputText ? <RxCross2 size={18} className="text-neutral-200"/> : <RxCross2 size={18} />}
            </button>
        </div>
            
            <textarea
        //rows="8"
        className="bg-neutral-950 w-lg rounded-2xl p-3 outline-0 font-roboto text-neutral-400 h-18 focus:h-60 focus:w-3xl transition-all duration-300 custom-scrollbar shadow-2xl"
        placeholder="Enter your text here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
        </div>
      </div>

      {/* Buttons */}
      <div
      className=" flex justify-center items-center text-neutral-200 font-bn"
      >
        <div 
       className="bg-neutral-950 w-lg rounded-full p-1 items-center flex justify-between"
       style={{ marginTop: "10px" }}
      >
        <button 
        className="mx-0.5 bg-neutral-800 p-1 rounded-full px-5 text-neutral-200 hover:bg-neutral-100 hover:text-neutral-900 hover:shadow-neutral-300 hover:scale-105 transition flex justify-center items-center"
        onClick={() => handleAI("rewrite")
        
        }>
         <PiListStar size={18} className="m-1"/> Rewrite
        </button>

        <button
        className="mx-.05 bg-neutral-800 p-1 rounded-full px-5 text-neutral-200 hover:bg-neutral-100 hover:text-neutral-900 hover:shadow-neutral-300 hover:scale-105 transition flex justify-center"
          onClick={() => handleAI("summarize")}
          
        >
          <WiStars size={18} className="m-1"/> Summarize
        </button>
      </div>
      </div>

      {/* Output */}
      <div
      className="w-full flex justify-center"
      >
       {
       output? <div
      className="bg-neutral-400 w-lg rounded-2xl font-roboto mt-4 p-3 text-neutral-700 transition-all duration-300"
        
      >
        <div
         className="flex justify-between"
        >
            <h1
             className="p-2 text-neutral-600"
            >
                Text
            </h1> 
            <button
             onClick={handleCopy}
             className="p-3 bg-neutral-400 text-neutral-200 hover:bg-neutral-500 rounded-full hover:scale-100 transition"
            >
              {copied ? <FiCheck size={18} /> : <FiCopy size={18} />}
            </button>
        </div>
        {loading ? "Loading..." : 
        <p
         className="mx-5"
        >{output}</p>
        }
      </div>
      :
      <></>
      }
      </div>
    </div>
  );
}

export default Writly;
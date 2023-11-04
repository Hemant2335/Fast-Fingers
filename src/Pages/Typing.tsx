import React from "react";
import { useEffect, useState } from "react";

// Creating a Pragraph

const Typing = () => {
  interface Paragraph {
    paragraph: string;
    number_of_words: number;
  }

  const [Para, setPara] = useState<Paragraph>({} as Paragraph);
  const [letter, setletter] = useState<JSX.Element[]>([]);
  // Calling the Backend Api call

  const getPara = async (): Promise<void> => {
    // const TextArea = document.querySelector(".TextArea");
    const res = await fetch("http://localhost:4000/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: Paragraph[] = await res.json();
    let random_number: number = Math.floor(Math.random() * 12);
    setPara(data[random_number]);
    const letterElements = data[random_number].paragraph.toLowerCase()
      .split("")
      .map((char, index) =>
        char === " " ? (
          <h1 key={index} className="text-[5vh] w-fit text-gray-400">
            &nbsp;
          </h1>
        ) : (
          <h1 key={index} className="text-[5vh] w-fit text-gray-400">
            {char}
          </h1>
        )
      );

    setletter(letterElements);
    console.log(letter);
  };
  useEffect(() => {
    getPara();
  }, []);

  // Function to find the typing speed

  // start the Clock
  
  const startClock = (): void => {
    const time = document.querySelector(".timeclock") as HTMLHeadingElement;
    let sec = 0;
    let min = 0;
    let hour = 0;

    setInterval(()=>{
      sec++;
      if(sec === 60){
        sec = 0;
        min++;
      }
      if(min === 60){
        min = 0;
        hour++;
      }
      time.innerHTML = `${hour}:${min}:${sec}`;
    },1000)
  }

  const starttyping = (): void => {
    //line to remove focus from the button
   document.activeElement?.blur();
    startClock();
    let current_Index: number = 0;
    const textElements = document.querySelectorAll(".TextArea h1");
  
    document.addEventListener("keydown", (event) => {
      if (current_Index < Para.paragraph.length) {
        const typedChar = event.key.toLowerCase();
        const expectedChar = Para.paragraph[current_Index].toLowerCase();

        console.log(typedChar, expectedChar)

        if (typedChar === expectedChar) {
          // Character matches, so update the display accordingly
          textElements[current_Index].classList.add("text-orange-400");
          current_Index++;
  
          if (current_Index === Para.paragraph.length) {
            // All characters have been typed
            console.log("Typing complete");
          }
        } else if (event.key === " ") {
          // Handle spaces
          textElements[current_Index].classList.add("text-red-600");
          current_Index++;
        } else if (event.key === "Backspace") {
          // Handle backspace
          if (current_Index > 0) {
            if(textElements[current_Index - 1].classList.contains("text-red-600")){
              textElements[current_Index - 1].classList.remove("text-red-600");
            }
            else{textElements[current_Index - 1].classList.remove("text-orange-400");}
            textElements[current_Index - 1].classList.add("text-gray-400");
            current_Index--;
          }
        } else {
          // Handle incorrect characters
          textElements[current_Index].classList.add("text-red-600");
          current_Index++;
        }
      }
    });
  };
  
  

  return (
    <div className="h-[80vh] relative flex flex-col font-poppins">
      <div className="flex mt-[5vh] justify-between items-center w-full">
        <div className="w-[7vw]">
          <h1 className="text-lg font-semibold ">Time</h1>
          <h2 className="text-2xl font-bold text-[rgb(233,116,81)]  timeclock">00:00</h2>
        </div>

        <button
          className="bg-[#E97451] w-fit px-[5vh] h-[6vh] hover:scale-105 transition-transform rounded-md font-poppins font-medium"
          onClick={() => starttyping()}
        >
          Start
        </button>

        <div>
          <h1 className="text-lg font-semibold text-center">Speed</h1>
          <h2 className="text-2xl font-bold text-[#E97451]">60wpm</h2>
        </div>
      </div>

      <div className="w-full relative flex  mt-[10vh]  whitespace-normal ">
        <div className="absolute mx-[5vw] flex flex-wrap TextArea">
          {letter}
        </div>
      </div>
    </div>
  );
};

export default Typing;

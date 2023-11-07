import React from "react";
import { useEffect, useState, useRef } from "react";
import { BsPlay } from "react-icons/bs";
import { MdOutlineRestartAlt } from "react-icons/md";
import Results from "../Components/Results";

// Creating a Pragraph

const Typing = () => {
  interface Paragraph {
    paragraph: string;
    number_of_words: number;
  }

  const [Para, setPara] = useState<Paragraph>({} as Paragraph);
  const [letter, setletter] = useState<JSX.Element[]>([]);
  const [wordscount, setwordscount] = useState<number>(0);
  const [isTyping, setisTyping] = useState<boolean>(true);
  const [starttime, setstarttime] = useState<Date>(new Date());
  const [speed, setspeed] = useState<number | undefined>(undefined);
  const [Time, setTime] = useState<number | undefined>(undefined);
  const [Accuracy, setAccuracy] = useState<number | undefined>(undefined);
  const [Result, setResult] = useState<boolean>(false);
  const [FinalResult, setFinalResult] = useState<object[]>([] as object[]);

  // to find the Accuracy
  let correct: number = 0;

  let current_Index: number = 0;

  // Function to get the results from the backend or local storage

  const getResults = async (): Promise<void> => {
    const res = await fetch("http://localhost:4000/results", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
  };

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
    const letterElements = data[random_number].paragraph
      .toLowerCase()
      .split("")
      .map((char, index) =>
        char === " " ? (
          <h1 key={index} className="text-[4vh] w-fit text-gray-400">
            &nbsp;
          </h1>
        ) : (
          <h1 key={index} className="text-[4vh] w-fit text-gray-400">
            {char}
          </h1>
        )
      );

    setletter(letterElements);
    console.log(letter);
  };

  // Function to find the typing speed
  let IntervalId: number | undefined = undefined;
  // start the Clock
  const startClock = (): void => {
    setstarttime(new Date());
    const time = document.querySelector(".timeclock") as HTMLHeadingElement;
    let sec = 0;
    let min = 0;
    let hour = 0;

    if (IntervalId) {
      clearInterval(IntervalId);
    }

    IntervalId = setInterval(() => {
      sec++;
      if (sec === 60) {
        sec = 0;
        min++;
      }
      if (min === 60) {
        min = 0;
        hour++;
      }
      time.innerHTML = `${hour}:${min}:${sec}`;
    }, 1000);
  };

  const stopClock = (): void => {
    console.log(IntervalId);
    const time = document.querySelector(".timeclock") as HTMLHeadingElement;
    time.innerHTML = `00:00`;
    if (IntervalId) {
      clearInterval(IntervalId);
    }
  };

  // Function to Track the Keystrokes and marking right and wrong Typing
  let wordc = 0;
  const keydown = (event: KeyboardEvent) => {
    // Prevent the deafult behaviour of the keys
    if (event.key === " ") {
      event.preventDefault();
    }

    const textElements = document.querySelectorAll(".TextArea h1");
    if (current_Index < Para.paragraph.length) {
      const typedChar = event.key.toLowerCase();
      const expectedChar = Para.paragraph[current_Index].toLowerCase();

      console.log(typedChar, expectedChar);

      if (typedChar === expectedChar) {
        // Character matches, so update the display accordingly
        textElements[current_Index].classList.add("text-orange-400");
        current_Index++;
        correct++;
      } else if (event.key === " ") {
        // Handle spaces
        event.preventDefault();
        textElements[current_Index].classList.add("text-red-600");
        current_Index++;
      } else if (event.key === "Backspace") {
        // Handle backspace
        if (current_Index > 0) {
          if (
            textElements[current_Index - 1].classList.contains("text-red-600")
          ) {
            textElements[current_Index - 1].classList.remove("text-red-600");
          } else {
            textElements[current_Index - 1].classList.remove("text-orange-400");
            correct--;
          }
          textElements[current_Index - 1].classList.add("text-gray-400");
          current_Index--;
        }
      } else {
        // Handle incorrect characters
        textElements[current_Index].classList.add("text-red-600");
        current_Index++;
      }
    } else {
      setAccuracy(Math.round((correct / Para?.paragraph?.length) * 100));
      document.removeEventListener("keydown", keydown);
      if (FinalResult && speed && Time && Accuracy) {
        FinalResult.push({ speed: speed, time: Time, accuracy: Accuracy });
        sessionStorage.setItem("results", JSON.stringify(FinalResult));
        console.log(FinalResult);
      }
      console.log(IntervalId);
      stopClock();
      console.log("done");
      setResult(true);
    }
    setwordscount(current_Index);
    if (event.key !== "Backspace") typingSpeed(++wordc);
  };

  // function to find the speed of typing

  const typingSpeed = (wordc: number): void => {
    console.log(wordc);
    const speed = document.querySelector(".speed") as HTMLHeadingElement;
    const elapsedTime = new Date().getTime() - starttime.getTime(); // startTime should be set when typing begins
    console.log(elapsedTime);
    const seconds = elapsedTime / 1000;
    const minutes = seconds / 60;
    const wordsPerMinute = Math.round(wordc / 5 / minutes); // Assuming an average word length of 5 characters

    console.log(wordc, minutes, wordsPerMinute);
    setspeed(wordsPerMinute);
    setTime(seconds);
    speed.innerHTML = `${wordsPerMinute} wpm`;
  };

  const starttyping = (): void => {
    //line to remove focus from the button
    if (buttonref?.current) {
      buttonref?.current.blur();
    }
    setisTyping(!isTyping);
    startClock();
    current_Index = 0;
    document.addEventListener("keydown", keydown);
    // document.removeEventListener("keydown", starttyping);
  };

  // Function to restart Typing

  const restarttyping = (): void => {
    // Temporary Basis

    window.location.reload();
    //line to remove focus from the button

    // if(buttonref?.current)
    // {
    //   buttonref?.current.blur();
    // }
    // console.log(IntervalId);
    // const textElements = document.querySelectorAll(".TextArea h1");
    // textElements.forEach((element)=>{
    //   element.classList.remove("text-red-600");
    //   element.classList.remove("text-orange-400");
    //   element.classList.add("text-gray-400");
    // })
    // document.removeEventListener("keydown",keydown);
    // stopClock();
    // setwordscount(0);
    // current_Index = 0;
    // setisTyping(!isTyping)
  };

  // Creating a button on ref
  const buttonref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    getPara();
    let looggedin: boolean = false;
    if (looggedin) {
      getResults();
    } else {
      // Check if Browser supports Session storage
      if (sessionStorage !== undefined) {
        let data = sessionStorage.getItem("results");
        if (data) {
          let obj: object[] = JSON.parse(data);
          console.log(obj);
          setFinalResult(obj);
        }
      }
    }
  }, []);

  return (
    <div className="h-[80vh] relative flex flex-col ">
      <div className="flex mt-[5vh] justify-between items-center w-full">
        <div className="w-[7vw]">
          <h1 className="text-lg font-semibold font-poppins">Time</h1>
          <h2 className="text-2xl font-bold text-[rgb(233,116,81)]  timeclock font-poppins">
            00:00
          </h2>
        </div>

        {isTyping ? (
          <button
            ref={buttonref}
            className="text-[#E97451] text-3xl font-bold w-fit px-[5vh] h-[6vh] hover:scale-105 transition-transform rounded-md font-poppins"
            onClick={() => starttyping()}
          >
            <BsPlay />
          </button>
        ) : (
          <button
            ref={buttonref}
            className="text-[#E97451] text-3xl font-bold w-fit px-[5vh] h-[6vh] hover:scale-105 transition-transform rounded-md font-poppins"
            onClick={() => restarttyping()}
          >
            <MdOutlineRestartAlt />
          </button>
        )}

        <div>
          <h1 className="text-lg font-semibold text-center font-poppins timeclock">
            Speed
          </h1>
          <h2 className="text-2xl font-bold text-[#E97451] font-poppins speed">
            60wpm
          </h2>
        </div>
      </div>

      <div className="w-full  relative flex  mt-[10vh] flex-col  whitespace-normal ">
        <h1 className="mx-[5vw] font-poppins font-semibold">{`${wordscount}/${Para?.paragraph?.length}`}</h1>
        <div className="mt-[4vh] rounded-lg shadow-3xl p-[5vh] mx-[5vw] flex flex-wrap font-Jetbrains TextArea">
          {letter}
        </div>
      </div>
      <h1 className="font-poppins font-bold text-2xl mt-[8vh]">Results</h1>
      {FinalResult &&
        FinalResult.map((data: any) => (
          <Results
            speed={data.speed}
            time={data.time}
            accuracy={data.accuracy}
          />
        ))}
      {Result && <Results speed={speed} time={Time} accuracy={Accuracy} />}
    </div>
  );
};

export default Typing;

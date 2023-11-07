import React from "react";

interface TypingProps {
  speed : number | undefined,
  time : number | undefined,
  accuracy : number | undefined
}


const Results = (data : TypingProps) => {
  return (
    <div className="mt-[5vh]">
      <div className="mx-[10vh]">
        <div className=" p-[5vh] items-center flex justify-between rounded-lg shadow-3xl w-full  mb-[5vh]">
          <div>
            <h2 className="font-poppins font-bold text-2xl text-[#E97451]">{data?.speed} wpm</h2>
            <h1 className="font-poppins font-semibold text-xl text-center">Speed</h1>
          </div>
          <div>
            <h2 className="font-poppins font-bold text-2xl text-center text-[#E97451]">{data?.time} sec</h2>
            <h1 className="font-poppins font-semibold text-xl text-center">Time</h1>
          </div>
          <div>
            <h2 className="font-poppins font-bold text-2xl text-center text-[#E97451]">{data?.accuracy} % </h2>
            <h1 className="font-poppins font-semibold text-xl text-center">Accuracy</h1>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Results;

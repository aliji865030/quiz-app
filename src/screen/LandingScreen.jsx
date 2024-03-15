import React, { useRef, useState } from "react";

const LandingScreen = () => {
  const [quizData,setQuizData]=useState([])
  const readyBtn=useRef();
  const quizDiv=useRef();

  async function getData() {
    const data = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
    const parsedData = await data.json();

    // for (let i = 0; i < 10; i++) {
      const currentData = [
        {
        question: parsedData.results[0].question,
        rightAns: parsedData.results[0].correct_answer,
        wrongAns1: parsedData.results[0].incorrect_answers[0],
        wrongAns2: parsedData.results[0].incorrect_answers[1],
        wrongAns3: parsedData.results[0].incorrect_answers[2],
      }
    ]
      setQuizData([...currentData])
    // }
  }
  
  function loadQuiz(){
    readyBtn.current.style.display="none";
    quizDiv.current.style.display="block";
    console.log(quizData);
    getData()


  }




  return (
    <div>
     <div>
     <button ref={readyBtn} onClick={loadQuiz} className="border-2 text-2xl border-green-600 px-5 py-1 rounded-lg hover:bg-green-500 hover:text-white" >Ready</button>
     </div>
     <div ref={quizDiv} style={{display:"none"}}>
      {quizData.map((item,index)=>{
        return(
          <div className="text-black bg-red-400">
            <h1>{item.question}</h1>
            <ul className="c cursor-pointer" onClick={getData}>
              <li>
                {item.rightAns}
              </li>
              <li>
                {item.wrongAns1}
              </li>
              <li>
                {item.wrongAns2}
              </li>
              <li>
                {item.wrongAns3}
              </li>
            </ul>

          </div>
        
      )})}
       
     </div>
    </div>
  );
};

export default LandingScreen;

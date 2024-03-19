import React, { useRef, useState } from "react";

let currentCount=1
let ansValue=0
const LandingScreen = () => {
  // const [quizData,setQuizData]=useState([])
  const [quizData,setQuizData]=useState([]);
  const [count,setCount]=useState();
  const readyBtn=useRef();
  const quizDiv=useRef();
  const result=useRef();

  async function getData() {
    // const data = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
    const data=await fetch('https://the-trivia-api.com/v2/questions');
    const parsedData = await data.json();

    // for (let i = 0; i < 10; i++) {
      const currentData = 
        {
          question_no:currentCount++,
        question: parsedData[0].question.text,
        rightAns: parsedData[0].correctAnswer,
        wrongAns1: parsedData[0].incorrectAnswers[0],
        wrongAns2: parsedData[0].incorrectAnswers[1],
        wrongAns3: parsedData[0].incorrectAnswers[2]
        
      }
    
      setQuizData([currentData])
      // quizData.push(currentData)
    // }

    console.log(quizData);
  }
  
  function loadQuiz(){
    readyBtn.current.style.display="none";
    quizDiv.current.style.display="block";
    // console.log(quizData);
    getData()


  }

  function checkOption(e,question_no){
    // currentCount++;
      // console.log(e.target.innerText);
      // console.log(e);
      // console.log(e.target.parentElement.parentElement.children[0].innerText)

      if(e.target.innerText===e.target.parentElement.parentElement.children[0].innerText){
        ansValue++
      }

      if(question_no<10){
         getData();
      }

      if(question_no==10){
        quizDiv.current.style.display="none";
        result.current.style.display="block"
        setCount(ansValue)

      }

      console.log(question_no);
  }

  function playAgain(){
    result.current.style.display="none"
    quizDiv.current.style.display="block"
    setCount(0)
    currentCount=1
    getData();
  }




  return (
    <div className="h-screen w-full ">
     <div>
     <button ref={readyBtn} onClick={loadQuiz} className="border-2 text-2xl border-green-600 px-5 py-1 rounded-lg hover:bg-green-500 hover:text-white" >Ready</button>
     </div>
     <div ref={quizDiv} style={{display:"none", marginLeft:"30%", marginTop:"5%"}} className="  h-screen w-full " >
      {quizData.map((item,index)=>{
        return(
          <div className="text-black bg-red-400 w-6/12 py-5 rounded-xl px-3" key={item.question_no}>
            <h1 className="text-2xl font-semibold text-white pb-5">{item.question_no} : {item.question}</h1>
            <ul className="c cursor-pointer text-white flex flex-col justify-center items-start px-20 gap-2" >
              <li>
                 <button className="border border-white rounded-md px-10 py-1 bg-green-400 hover:bg-green-500" onClick={(e)=>{checkOption(e,item.question_no)}}>{item.rightAns}</button>
              </li>
              <li>
                <button className="border border-white rounded-md px-10 py-1 bg-green-400 hover:bg-green-500" onClick={(e)=>{checkOption(e,item.question_no)}}>{item.wrongAns1}</button>
              </li>
              <li>
                <button className="border border-white rounded-md px-10 py-1 bg-green-400 hover:bg-green-500" onClick={(e)=>{checkOption(e,item.question_no)}}>{item.wrongAns2}</button>
              </li>
              <li>
                <button className="border border-white rounded-md px-10 py-1 bg-green-400 hover:bg-green-500" onClick={(e)=>{checkOption(e,item.question_no)}}>{item.wrongAns3}</button>
              </li>
            </ul>

          </div>
        
      )})}
       
     </div>
     <div ref={result} style={{display:"none"}}>
      <p className="text-3xl border border-black rounded-md px-5 py-3 text-white bg-green-400 mt-20">
        Score : {count}/10
      </p>
      <button onClick={playAgain} className="border border-black px-7 py-1 bg-red-400 hover:bg-red-500 text-white rounded-md my-10">Play Again</button>
     </div>
    </div>
  );
};

export default LandingScreen;

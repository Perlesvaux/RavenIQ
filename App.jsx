"use strict";

import React, {
  StrictMode,
  useState,
  createContext,
  useContext,
  useEffect
} from "https://esm.sh/react?dev";
import { createRoot } from "https://esm.sh/react-dom/client?dev";


const S = [
  {N:"A1", Q:"./Q/A1.png", A:"4", O:[{index:1, sprite:"./O/A1_1.png"},{index:2, sprite:"./O/A1_2.png"},{index:3, sprite:"./O/A1_3.png"},{index:4, sprite:"./O/A1_4.png"},{index:5, sprite:"./O/A1_5.png"},{index:6, sprite:"./O/A1_6.png"}]},
  {N:"A2", Q:"./Q/A2.png", A:"5", O:[{index:1, sprite:"./O/A2_1.png"},{index:2, sprite:"./O/A2_2.png"},{index:3, sprite:"./O/A2_3.png"},{index:4, sprite:"./O/A2_4.png"},{index:5, sprite:"./O/A2_5.png"},{index:6, sprite:"./O/A2_6.png"}]},
  {N:"A3", Q:"./Q/A3.png", A:"1", O:[{index:1, sprite:"./O/A3_1.png"},{index:2, sprite:"./O/A3_2.png"},{index:3, sprite:"./O/A3_3.png"},{index:4, sprite:"./O/A3_4.png"},{index:5, sprite:"./O/A3_5.png"},{index:6, sprite:"./O/A3_6.png"}]},

  {N:"A4", Q:"./Q/A4.png", A:"2", O:[{index:1, sprite:"./O/A4_1.png"},{index:2, sprite:"./O/A4_2.png"},{index:3, sprite:"./O/A4_3.png"},{index:4, sprite:"./O/A4_4.png"},{index:5, sprite:"./O/A4_5.png"},{index:6, sprite:"./O/A4_6.png"}]},
  {N:"A5", Q:"./Q/A5.png", A:"6", O:[{index:1, sprite:"./O/A5_1.png"},{index:2, sprite:"./O/A5_2.png"},{index:3, sprite:"./O/A5_3.png"},{index:4, sprite:"./O/A5_4.png"},{index:5, sprite:"./O/A5_5.png"},{index:6, sprite:"./O/A5_6.png"}]},
  {N:"A6", Q:"./Q/A6.png", A:"3", O:[{index:1, sprite:"./O/A6_1.png"},{index:2, sprite:"./O/A6_2.png"},{index:3, sprite:"./O/A6_3.png"},{index:4, sprite:"./O/A6_4.png"},{index:5, sprite:"./O/A6_5.png"},{index:6, sprite:"./O/A6_6.png"}]},

  {N:"A7", Q:"./Q/A7.png", A:"6", O:[{index:1, sprite:"./O/A7_1.png"},{index:2, sprite:"./O/A7_2.png"},{index:3, sprite:"./O/A7_3.png"},{index:4, sprite:"./O/A7_4.png"},{index:5, sprite:"./O/A7_5.png"},{index:6, sprite:"./O/A7_6.png"}]},
  {N:"A8", Q:"./Q/A8.png", A:"2", O:[{index:1, sprite:"./O/A8_1.png"},{index:2, sprite:"./O/A8_2.png"},{index:3, sprite:"./O/A8_3.png"},{index:4, sprite:"./O/A8_4.png"},{index:5, sprite:"./O/A8_5.png"},{index:6, sprite:"./O/A8_6.png"}]},
  {N:"A9", Q:"./Q/A9.png", A:"1", O:[{index:1, sprite:"./O/A9_1.png"},{index:2, sprite:"./O/A9_2.png"},{index:3, sprite:"./O/A9_3.png"},{index:4, sprite:"./O/A9_4.png"},{index:5, sprite:"./O/A9_5.png"},{index:6, sprite:"./O/A9_6.png"}]},

  {N:"A10", Q:"./Q/A10.png", A:"3", O:[{index:1, sprite:"./O/A10_1.png"},{index:2, sprite:"./O/A10_2.png"},{index:3, sprite:"./O/A10_3.png"},{index:4, sprite:"./O/A10_4.png"},{index:5, sprite:"./O/A10_5.png"},{index:6, sprite:"./O/A10_6.png"}]},
  {N:"A11", Q:"./Q/A11.png", A:"5", O:[{index:1, sprite:"./O/A11_1.png"},{index:2, sprite:"./O/A11_2.png"},{index:3, sprite:"./O/A11_3.png"},{index:4, sprite:"./O/A11_4.png"},{index:5, sprite:"./O/A11_5.png"},{index:6, sprite:"./O/A11_6.png"}]},
  {N:"A12", Q:"./Q/A12.png", A:"4", O:[{index:1, sprite:"./O/A12_1.png"},{index:2, sprite:"./O/A12_2.png"},{index:3, sprite:"./O/A12_3.png"},{index:4, sprite:"./O/A12_4.png"},{index:5, sprite:"./O/A12_5.png"},{index:6, sprite:"./O/A12_6.png"}]},
]

function Item({ path, tracker }){

  const grid_container = {display: "grid", gridTemplateColumns: "auto auto auto", padding: "10px"}
  const option_image = {width:"8em", height:"5em"}
  const card_body = {width: "100%"}
  const card = {width:"30em", heigth:"10em"}
  const card_image = {width:"22em", heigth:"10em", margin:"auto"}

  return(
    <>
      <div className="card" style={card}>

      <img src={path.Q}  className="card-img-top" style={card_image}/>

          <div className="card-body" style={card_body}>

            <div style={grid_container}>
            {
              path.O.map((option)=> 
                <ul key={`opt-${path.N}-${option.index}`} className="list-group list-group-flush">
                  <input type="radio" name={path.N} id={`opt-${path.N}-${option.index}`} value={option.index} onChange={tracker} />
                  <label htmlFor={`opt-${path.N}-${option.index}`}><img style={option_image} src={option.sprite} /> </label>
                </ul>)
            }
            </div>

      </div>
      </div>

    </>
    
  )
}




function Form( {path} ){

  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);

  function submit(e){
    e.preventDefault();

    let total = 0;
    for(let each of path){
      const correctAnswer  = each.A;
      const selectedAnswer = selectedOptions[each.N];
      if (selectedAnswer === correctAnswer){
        total+=1;
      }
    }

    setScore(total)

    // path.forEach(question => {
    //   const correctAnswer = question.A;
    //   const selectedAnswer = selectedOptions[question.N];
    //   //Evaluation!
    //   if (selectedAnswer === correctAnswer) {
    //     setScore(score + 1);
    //   }
    // });

    // Reset selectedOptions after evaluation
    // setSelectedOptions({});


  }

    function handleOptionChange(questionName, selectedValue) {
    console.log(questionName, selectedValue.target.value)
    setSelectedOptions({...selectedOptions, [questionName]: selectedValue.target.value});
    console.log(selectedOptions)
  }

 return (
    <>
      <form onSubmit={submit}>
        {path.map((question) => (
          <Item
            key={question.N}
            path={question}
            tracker={(selectedValue) => handleOptionChange(question.N, selectedValue)}
          />
        ))}
        <button type="submit">Submit</button>
        <p>Score: {score}</p>
      </form>
    </>
  );}





function App() {
//Component logic goes here
return (<>

  <Form path={S} />


  </>)}




createRoot(document.getElementById("root")).render(<App />);

import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import Button from "./components/Button";
import ButtonBox from "./components/ButtonBox";

import React, {useState} from "react";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

/*input formatting*/
const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");


const App = () => {

  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  /* The numClickHandler function gets triggered only if any of the number buttons (0–9) are pressed. 
  Then it gets the value of the Button and adds that to the current num value.*/
  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(calc.num + value))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  }

  /*The commaClickHandler function gets fired only if the decimal point (.) is pressed.
  It adds the decimal point to the current num value, making it a decimal number.*/
  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
  
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  /*The signClickHandler function gets fired when the user press either +, –, * or /.
  The particular value is then set as a current sign value in the calc object.*/
  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
  
    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };


  /*The equalsClickHandler function calculates the result when the equals button (=) is pressed.
  The calculation is based on the current num and res value, as well as the sign selected (see the math function).*/
  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "X"
          ? a * b
          : a / b;
  
      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : toLocaleString (
              math(Number(removeSpaces(calc.res)), Number(removeSpaces(calc.num)), 
              calc.sign)
            ),
        sign: "",
        num: 0,
      });
    }
  };

  /*The invertClickHandler function first checks if there’s any entered value (num) or 
  calculated value (res) and then inverts them by multiplying with -1:*/
  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
      sign: "",
    });
  };

  /*percentClickHandler*/
  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num) ) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;
  
    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  /*resetClickHandler*/
  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {
          btnValues.flat().map((btn,i) => {
            return (
              <Button
                key={i}
                className={btn === "=" ? "equals" : ""}
                value={btn}
                onClick={
                  btn === "C"
                    ? resetClickHandler
                    : btn === "+-"
                    ? invertClickHandler
                    : btn === "%"
                    ? percentClickHandler
                    : btn === "="
                    ? equalsClickHandler
                    : btn === "/" || btn ==="X" || btn === "-" || btn === "+"
                    ? signClickHandler
                    : btn === "."
                    ? commaClickHandler
                    : numClickHandler
                }
              />
            );
          })
        }
      </ButtonBox>
    </Wrapper>
  );
}

export default App;

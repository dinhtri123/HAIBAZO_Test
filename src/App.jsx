import { useState, useEffect, useRef } from "react";
import styles from "./App.module.css";

function App() {
  const [error, setError] = useState('')
  const [title, setTitle] = useState("LET'S PLAY");
  const [textButton, setTextButton] = useState("Play");
  const [time, setTime] = useState("0.0");
  const [run, setRun] = useState(false);
  const [count, setCount] = useState(0);
  const [elm, setElm] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [activeClass, setActiveClass] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (run) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => (parseFloat(prevTime) + 0.1).toFixed(1));
      }, 100);
    } else{
      clearInterval(intervalRef.current);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [run]);

  const handlePlayGame = () => {
    setRun(true);
    setTime("0.0");
    setTitle("LET'S PLAY");
    setTextButton("Restart");
    setCurrentStep(1);
    setActiveClass([]);

    const elmArr = [];
    const boxWidth = 670;
    const boxHeight = 670;

    for (let i = 1; i <= count; i++) {
      const posX = Math.random() * (boxWidth - 44);
      const posY = Math.random() * (boxHeight - 44);
      elmArr.push({
        posX: posX,
        posY: posY
      });
    }
    setElm(elmArr);
    
  };

  const handleClickNumber = (number) => {
    if (number === currentStep) {
      setActiveClass([...activeClass, number]);
      if (number === count) {
        setTimeout(() => {
          setTitle(<span className={styles.titleWin}>All CLEARED</span>);
          clearInterval(intervalRef.current);
          setRun(false)
        },1000)
      } else {
        setCurrentStep(currentStep + 1);
      }
    } else {
      setTitle(<span className={styles.titleLoss}>GAME OVER</span>);
      clearInterval(intervalRef.current);
      setCurrentStep(1);
      setRun(false)
    }
  };
  const handleChangeInput = (e) => {
    const getValue = parseInt(e.target.value);
   
    if(getValue === '' || getValue > 0) {
      setCount(getValue);
      setError('');
    }else {
      setError('Vui lòng nhập số lớn hơn 0')
    }
  }
  return (
    <div className={styles.main}>
      <h2>{title}</h2>
      <div className={styles.mainItem}>
        <h3>Points: </h3>
        <input
          type="number"
          name="points"
          id="points"
          defaultValue={""}
          onChange={handleChangeInput}
        />
        {error}
      </div>
      <div className={styles.mainItem}>
        <h3>Time:</h3>
        <p>{time}s</p>
      </div>
      <button className={styles.btnPlay} onClick={handlePlayGame} disabled={error === '' ? false : true}>
        {textButton}
      </button>
      <div className={styles.boxResult}>
        {elm.map((element, index) => (
          <span
            key={index}
            className={`${
              activeClass.includes(index + 1) ? styles.active : ""
            }`}
            style={{ top: `${element.posY}px`, left: `${element.posX}px` }}
            onClick={() => handleClickNumber(index + 1)}
          >
            {index + 1}
          </span>
        ))}
      </div>
    </div>
  );
}

export default App;

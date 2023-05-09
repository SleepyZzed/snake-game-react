import React, {useState, useRef, useEffect} from 'react';
import '../snake/snakegame.scss';
import { useInterval } from '../../useInterval';
import {
  CANVAS_SIZE,
  SNAKE_START,
  FOOD_START,
  SCALE,
  SPEED,
  DIRECTIONS
} from '../../constants';

import sound from '../../assets/sounds/bg.mp3';
import countdownsound from '../../assets/sounds/countdown.wav';
import collectionSound from '../../assets/sounds/collect.mp3';
import imgob1 from '../../assets/images/food.png';
import imgob2 from '../../assets/images/body.png';
import imgob3 from '../../assets/images/head.png';
import imgob4 from '../../assets/images/tail.png';

const SnakeGame = () => {
  
  //const timer = 0;
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState(SNAKE_START);
  const [food, setFood] = useState(FOOD_START);
  const [dir, setDir] = useState([0,-1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameover] = useState(false);
  const [gamePlaying, setGamePlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [performance, setPerformance] = useState(false);
    
    const [playing, setPlaying] = useState(false);
    const [playingCount, setPlayingCount] = useState(false);
    const [playingCollect, setPlayingCollect] = useState(false);
  
    const audio = sound;
    const countdown = countdownsound;
    const collect = collectionSound;

    const audioRef = useRef(new Audio(audio));
    const audioRefCountDown = useRef(new Audio(countdown));
    const audioRefCollect = useRef(new Audio(collect));

    const [isVisible, setIsVisible] = useState(true);
    const [isVisibleTitle, setIsVisibleTitle] = useState(true);
    const [isVisibleHelp, setIsVisibleHelp] = useState(true);

  



    const [seconds, setSeconds] = useState(3);
    const timer = (() => {
      if (seconds > 0) {
        setTimeout(() => setSeconds(seconds - 1), 1000);
        playCountDown();
        console.log({seconds});
      } else {
       
        pauseCountDown();
        console.log({seconds});
        
      }
    });
    const playCountDown = () => {
      if(!playingCount){
      setPlayingCount(true);
      audioRefCountDown.current.currentTime = 0;
      audioRefCountDown.current.play();
      audioRefCountDown.current.volume = 0.1;
      }
      
    };
  
    const pauseCountDown = () => {
      if(playingCount){
        setPlayingCount(false);
        audioRefCountDown.current.currentTime = 0;
        audioRefCountDown.current.pause();
      }
      
    };
    const playCollect = () => {
     
      if(playingCollect)
      {
        
      }
      setPlayingCollect(true);
      audioRefCollect.current.currentTime = 0;
      audioRefCollect.current.play();
      audioRefCollect.current.volume = 0.1;
      
      
    };
  
    
    const play = () => {
      if(!playing){
      setPlaying(true);
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      audioRef.current.volume = 0.1;
      }
      
    };
  
    const pause = () => {
      if(playing){
        setPlaying(false);
        audioRef.current.currentTime = 0;
        audioRef.current.pause();
      }
      
    };
  
    
    
   
    


  const startGame = () => {
    
    
    setGamePlaying(true);
    setSnake(SNAKE_START);
    setFood(FOOD_START);
    setDir([0,-1]);
    setSpeed(SPEED);
    setGameover(false);
    setIsVisible(!isVisible);
    setIsVisibleTitle(!isVisibleTitle);
    setIsVisibleHelp(!isVisibleHelp);
    setScore(0);
   
    
    

  }

  const endGame = () => {
    setGamePlaying(false);
    setSpeed(null);
    setGameover(true);
    pause();
    pauseCountDown();
    setIsVisible(!isVisible);
    setSeconds(3);
    setIsVisibleTitle(!isVisibleTitle);
    setIsVisibleHelp(!isVisibleHelp);
    
    
    

  }
  
  
 const moveSnake = ({ keyCode }) => 
  keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode]);

  const generateFood = () =>
  food.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)));
  
  
  

  const checkCollision = (piece, s = snake) => {
    if(
      piece[0] * SCALE >= CANVAS_SIZE[0] ||
      piece[0] < 0 ||
      piece[1] * SCALE >= CANVAS_SIZE[1] ||
      piece[1] < 0 

    ) 
      return true;    
      
    for(const segment of s)
    {
      if(piece[0] === segment[0] && piece[1] === segment[1]) return true;
    }
    
  return false;
  };

  const checkFoodCollision = newSnake => {
    if (newSnake[0][0] === food[0] && newSnake[0][1] === food[1]) {
      let newFood = generateFood();
      
        setSpeed(speed -3);
        playCollect();
        setScore(score +1);
      while (checkCollision(newFood, newSnake)) {
        newFood = generateFood();
        
      }
      setFood(newFood);
      
      
      return true;
    }
    return false;
  };
  
  const gameLoop = () => {
    
    timer();
    if(seconds <= 0){
    play();
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    if(checkCollision(newSnakeHead)) endGame();
    if (!checkFoodCollision(snakeCopy)) snakeCopy.pop();
    setSnake(snakeCopy);
    }
    
  }

  
  
  useEffect(() => {
    var imageObj1 = new Image();
    var imageObj2 = new Image();
    var imageObj3 = new Image();
    var imageObj4 = new Image();
    imageObj1.src = imgob1;
    imageObj2.src = imgob2;
    imageObj3.src = imgob3;
    imageObj4.src = imgob4;
    const context = canvasRef.current.getContext("2d");
    

    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]);
    if(performance){
    context.fillStyle ='yellow';
    const [head, ...tail] = snake;
    context.drawImage(imageObj3, head[0], head[1], 1, 1); 
    snake.slice(1, -1).forEach(([x, y]) => context.drawImage(imageObj2,x, y, 1, 1,));
    const [tailX, tailY] = tail.slice(-1)[0];
    context.drawImage(imageObj4, tailX, tailY, 1, 1);
    context.drawImage(imageObj1, food[0], food[1], 1, 1);
     // Save the current canvas state
    context.fillStyle = 'purple';
    }
    else{
    context.fillStyle ='brown';
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1,));
    context.fillStyle='yellow';
    context.fillRect(food[0], food[1], 1, 1);
    }

  }, [snake, food, gameOver])

  useInterval(() => gameLoop(), speed);
  useEffect(() => {
    document.addEventListener('keydown', detectKeyDown, true);
    
  });

  const performanceMode = () =>{
    if(!performance){
    setPerformance(true);
    }
    else{
      setPerformance(false);
    }
  }

  const detectKeyDown = (e) =>{
    console.log(e);
    if(e.keyCode === 13){
      if(!gamePlaying)
      {
      startGame();
      }
    }
    
    moveSnake(e);
  } 
  
  return (
    <div className='snakegamecontainer'>
      <div className="title">
        <h2 style={{ display: isVisibleTitle ? "none" : "block" }}>
          Score:{score}
        </h2>
        {gameOver && score >= 0 && <h2>YOUR SCORE!: {score}</h2>}
        {score <= 0 ? (
        <h2 style={{ display: isVisibleTitle ? "block" : "none" }}>
          Snake Game
        </h2>
        ) : null}
        <p className="help" style={{ display: isVisibleTitle ? "block" : "none" }}>Press enter or hit the start button to play, Some browsers may not render graphics properly, please toggle graphics</p>
      </div>
      <div className="canvaswrapper">
        <canvas
         className="canvas"
         ref={canvasRef}
         width={`${CANVAS_SIZE[0]}px`}
         height={`${CANVAS_SIZE[1]}px`}
        />
         
        {gameOver && score <= 0 && <div className="gameover">GAME OVER! </div> }
        <button className="startgame" onClick={startGame} style={{ display: isVisible ? "block" : "none" }}>
        Start Game
        </button>
        <button className="performance" onClick={performanceMode} style={{ display: isVisible ? "block" : "none" }}>
        Graphics
        </button>
        

      </div>

    </div>
  )
}

export default SnakeGame;
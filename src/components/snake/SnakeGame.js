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

const SnakeGame = () => {

  const canvasRef = useRef(null);
  const [snake, setSnake] = useState(SNAKE_START);
  const [food, setFood] = useState(FOOD_START);
  const [dir, setDir] = useState([0,-1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameover] = useState(false);



  const startGame = () => {
    setSnake(SNAKE_START);
    setFood(FOOD_START);
    setDir([0,-1]);
    setSpeed(SPEED);
    setGameover(false);

  }

  const endGame = () => {
    setSpeed(null);
    setGameover(true);

  }
  const moveSnake = ({ keyCode }) => 
  keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode]);
  
  const generateFood = () => {

  }

  const checkCollision = () => {

  }
  const checkAppleCollision = () => {

  }
  
  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    snakeCopy.pop();
    setSnake(snakeCopy);
  }

  

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]);
    context.fillStyle ='red';
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1,));
    context.fillStyle = 'yellow';
    context.fillRect(food[0], food[1], 1, 1);

  }, [snake, food, gameOver])

  useInterval(() => gameLoop(), speed);
  useEffect(() => {
    document.addEventListener('keydown', detectKeyDown, true);
  })

  const detectKeyDown = (e) =>{
    moveSnake(e);
  } 
  
  return (
    <div className='snakegamecontainer'>
      <div className="title">
        <h2>
          Snake Game
        </h2>
      </div>
      <div tabIndex='0'className="canvaswrapper">
        <canvas
         className="canvas"
         ref={canvasRef}
         width={`${CANVAS_SIZE[0]}px`}
         height={`${CANVAS_SIZE[1]}px`}
        />
        {gameOver && <div className="gameover">GAME OVER!</div> }
        <button className="startgame" onClick={startGame}>
        Start Game
        </button>

      </div>

    </div>
  )
}

export default SnakeGame;
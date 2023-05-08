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

  }

  const endGame = () => {

  }
  const moveSnake = () => {
    
  }
  
  const generateFood = () => {

  }

  const checkCollision = () => {

  }
  const checkAppleCollision = () => {

  }
  
  const gameLoop = () => {

  }

  useEffect(() => {

  }, [snake, food, gameOver])

  return (
    <div className='snakegamecontainer'>
      <div className="title">
      Snake Game
      </div>
      <div role='button' tabIndex='0'className="canvaswrapper" onKeyDown={ e=> moveSnake(e)}>
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
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
  return (
    <div className='snakegame'>Snake Game</div>
  )
}

export default SnakeGame;
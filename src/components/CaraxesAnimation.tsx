import { useEffect } from 'react';
import Two from 'two.js';
import { Group } from 'two.js/src/group';
import trigUtil from '../utils/trig';

const twoParams = {
	fullscreen: true
};

let two = new Two(twoParams);

let mainLoopId: number = -1;

// operations per second
const OPPS = 60;
const SNAKE_SIZE = 100;
const STEPS = SNAKE_SIZE / 2;
const SNAKE_SPACING = 2;
const SNAKE_W = SNAKE_SPACING * SNAKE_SIZE;
const SNAKE_H = 10;
const SNAKE_HEAD = 5;
const SNAKE_COLOR = '#6e0303';

let caraxes: Group = new Group();

const simpleAnimation = () => {
	const elem = document.getElementById(
		'animation-container'
	)! as HTMLElement;
	two.appendTo(elem);
	const snakeGroupArray = [];

	for (let i = 0; i <= SNAKE_SIZE; i++) {
		let y = trigUtil.getSinPathAt(i, STEPS) * SNAKE_H;
		let radius = (i * SNAKE_HEAD) / SNAKE_SIZE;
		let snakeCircle = two.makeCircle(
			(i + 1) * SNAKE_SPACING - SNAKE_W,
			y,
			radius
		);
		snakeCircle.fill = SNAKE_COLOR;
		snakeGroupArray.push(snakeCircle);
	}

	caraxes = two.makeGroup(...snakeGroupArray);
	caraxes.noStroke();

	//TODO proper init
	const w = document.body.clientWidth;
	const h = document.body.clientHeight;

	caraxes.position.set(w / 2, h / 2);

	mainLoopId = setInterval(() => {
		for (let i = 0; i < caraxes.children.length; i++) {
			let nextPosIdx;
			if (i + 1 >= caraxes.children.length) {
				nextPosIdx = 0;
			} else {
				nextPosIdx = i + 1;
			}

			caraxes.children[i].position.set(
				caraxes.children[i].position.x,
				caraxes.children[nextPosIdx].position.y
			);
		}
	}, 1000 / OPPS);
	two.play();
};

const onMouseEvent = (e: MouseEvent) => {
	const x = e.pageX;
	const y = e.pageY;
	caraxes.position.set(x, y);
	// Listen for WxH elsewhere
	const w = document.body.clientWidth;
	const h = document.body.clientHeight;

	const originX = w / 2;
	const originY = h / 2;

	const theta = Math.atan2(y - originY, x - originX);

	caraxes.rotation = theta;
};

const cleanUp = () => {
	window.removeEventListener('mousemove', onMouseEvent);
	clearInterval(mainLoopId);
	two.clear();
};

const CaraxesAnimation = () => {
	useEffect(() => {
		window.addEventListener('mousemove', onMouseEvent);
		simpleAnimation();
		return () => cleanUp();
	}, []);

	return (
		<>
			<div id='animation-container'></div>
		</>
	);
};

export default CaraxesAnimation;

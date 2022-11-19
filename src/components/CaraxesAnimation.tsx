import { useEffect } from 'react';
import Two from 'two.js';
import { Group } from 'two.js/src/group';
import { Shape } from 'two.js/src/shape';
import utils from '../utils/trig';

const twoParams = {
	fullscreen: true
};

let two = new Two(twoParams);

const velocity = 1;
const SNAKE_SIZE = 100;
const STEPS = SNAKE_SIZE / 2;
const SNAKE_SPACING = 2;
const SNAKE_W = SNAKE_SPACING * SNAKE_SIZE;
const SNAKE_H = 10;
const SNAKE_HEAD = 5;
const SNAKE_COLOR = '#6e0303';

let stepCounter = 0;

let sinSteps: number[];
sinSteps = [];
for (let i = 0; i <= STEPS; i++) {
	let rad = (2 * Math.PI * i) / STEPS - 1;
	sinSteps.push(Math.sin(rad));
}

let caraxes: Group = new Group();

const getNextSinStep = () => {
	if (stepCounter >= STEPS) {
		stepCounter = 0;
	}
	let result = sinSteps[stepCounter];
	stepCounter++;
	return result;
};

const simpleAnimation = () => {
	const elem = document.getElementById('animation-container')! as HTMLElement;
	two.appendTo(elem);
	const snakeGroupArray = [];

	for (let i = 0; i < SNAKE_SIZE; i++) {
		let y = getNextSinStep() * SNAKE_H;
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
	caraxes.scale = 2;
	caraxes.noStroke();

	const update = (frameCount: number) => {
		if (frameCount % velocity != 0) {
			return;
		}
		for (let i = 0; i < caraxes.children.length; i++) {
			let nextPosIdx;
			if (i + 1 >= caraxes.children.length) {
				nextPosIdx = 0;
			} else {
				nextPosIdx = i + 1;
			}
			caraxes.children[i].position.y =
				caraxes.children[nextPosIdx].position.y;
		}
	};

	two.bind('update', update);
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

	const theta = utils.calcAngleDegrees(x - originX, y - originY);

	caraxes.rotation = utils.deg2rad(theta);
};

const cleanUp = () => {
	window.removeEventListener('mousemove', onMouseEvent);
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

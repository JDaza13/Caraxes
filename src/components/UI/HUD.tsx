import { useEffect, useState } from 'react';
import classes from './HUD.module.scss';

const updatesPerSecond = 5;
let debouncerWait: number = -1;

const HUD = () => {
	const [xPos, setXpos] = useState<number>(0);
	const [yPos, setYpos] = useState<number>(0);

	const onMouseEvent = (e: MouseEvent | TouchEvent) => {
		let x = 0;
		let y = 0;
		if (e instanceof TouchEvent) {
			if (e.targetTouches && e.targetTouches[0]) {
				x = e.targetTouches[0].pageX;
				y = e.targetTouches[0].pageY;
			}
		} else {
			x = e.pageX;
			y = e.pageY;
		}
		if (debouncerWait) {
			clearTimeout(debouncerWait);
		}
		debouncerWait = setTimeout(function () {
			setXpos(x);
			setYpos(y);
		}, 1000 / updatesPerSecond);
	};

	useEffect(() => {
		window.addEventListener('mousemove', onMouseEvent);
		window.addEventListener('touchmove', onMouseEvent);
		return () => {
			window.addEventListener(
				'mousemove',
				onMouseEvent
			);
			window.addEventListener(
				'touchmove',
				onMouseEvent
			);
		};
	}, []);

	return (
		<div className={classes.hudcontainer}>
			<span>x: {xPos}</span>
			<br />
			<span>y: {yPos}</span>
		</div>
	);
};

export default HUD;

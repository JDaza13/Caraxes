import { useEffect, useState } from 'react';
import classes from './HUD.module.scss';

const updatesPerSecond = 5;
let debouncerWait = false;

const HUD = () => {
	const [xPos, setXpos] = useState<number>();
	const [yPos, setYpos] = useState<number>();

	const onMouseEvent = (e: MouseEvent) => {
		if (!debouncerWait) {
			setXpos(e.pageX);
			setYpos(e.pageY);
			debouncerWait = true;
			setTimeout(function () {
				debouncerWait = false;
			}, 1000 / updatesPerSecond);
		}
	};

	useEffect(() => {
		window.addEventListener('mousemove', onMouseEvent);
		return () => window.addEventListener('mousemove', onMouseEvent);
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

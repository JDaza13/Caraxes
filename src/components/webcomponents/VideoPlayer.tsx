import { useEffect, useRef } from 'react';
import classes from './VideoPlayer.module.scss';

const VIDEO_SRC = '/caraxes_roar_fragment.mp4';
const videoProps = {
	muted: true,
	loop: true
};

const VideoPlayer = () => {
	const videoRef = useRef<HTMLVideoElement>(null);

	const startVideo = () => {
		videoRef.current?.play();
	};

	useEffect(() => {
		startVideo();
	}, []);

	const toggleMute = () => {
		videoRef.current!.muted = !videoRef.current?.muted;
	};

	return (
		<div className={classes['video-clip-container']}>
			<video
				ref={videoRef}
				{...videoProps}
				onClick={toggleMute}
			>
				<source src={VIDEO_SRC} type='video/mp4' />
			</video>
		</div>
	);
};

export default VideoPlayer;

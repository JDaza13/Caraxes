import React, { useEffect, useRef } from 'react';
import './App.css';
import CaraxesAnimation from './components/CaraxesAnimation';
import Header from './components/layout/Header';
import HUD from './components/UI/HUD';
import VideoPlayer from './components/webcomponents/VideoPlayer';

function App() {
	return (
		<div className='App'>
			<React.StrictMode>
				<Header />
				<VideoPlayer />
				<CaraxesAnimation />
				<HUD />
			</React.StrictMode>
		</div>
	);
}

export default App;

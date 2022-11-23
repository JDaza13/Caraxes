import './App.css';
import CaraxesAnimation from './components/CaraxesAnimation';
import Header from './components/layout/Header';
import HUD from './components/UI/HUD';

function App() {
	return (
		<div className='App'>
			<Header />
			<CaraxesAnimation />
			<HUD />
		</div>
	);
}

export default App;

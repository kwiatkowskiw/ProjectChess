import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Content from './components/Content/Content';
import Layout from './components/Layout/Layout';
import Puzzles from './components/Content/Puzzles/Puzzles';
import Play from './components/Content/Play/Play';
import NotFound from './pages/NotFound/NotFound';
import LevelOne from './components/Content/Puzzles/Levels/LevelOne'
import LevelTwo from './components/Content/Puzzles/Levels/LevelTwo'
import LevelThree from './components/Content/Puzzles/Levels/LevelThree'
import LevelFour from './components/Content/Puzzles/Levels/LevelFour'
import LevelFive from './components/Content/Puzzles/Levels/LevelFive'
import LevelSix from './components/Content/Puzzles/Levels/LevelSix'
import LevelSeven from './components/Content/Puzzles/Levels/LevelSeven'
import LevelEight from './components/Content/Puzzles/Levels/LevelEight'
import LevelNine from './components/Content/Puzzles/Levels/LevelNine'
import LevelTen from './components/Content/Puzzles/Levels/LevelTen'


function App() {

	// menu router
	const content = (
		<Routes>
			<Route exact path='/' element={<Content />}></Route>
			<Route path='/puzzles' element={<Puzzles/>}></Route>
			<Route path='/puzzles/level1' element={<LevelOne/>}></Route>
			<Route path='/puzzles/level2' element={<LevelTwo/>}></Route>
			<Route path='/puzzles/level3' element={<LevelThree/>}></Route>
			<Route path='/puzzles/level4' element={<LevelFour/>}></Route>
			<Route path='/puzzles/level5' element={<LevelFive/>}></Route>
			<Route path='/puzzles/level6' element={<LevelSix/>}></Route>
			<Route path='/puzzles/level7' element={<LevelSeven/>}></Route>
			<Route path='/puzzles/level8' element={<LevelEight/>}></Route>
			<Route path='/puzzles/level9' element={<LevelNine/>}></Route>
			<Route path='/puzzles/level10' element={<LevelTen/>}></Route>
			<Route path='/play' element={<Play />}></Route>
			<Route path='*' element={<NotFound/>}></Route>
		</Routes>
	);
	return (
		<Router>
			<Layout content={content} />
		</Router>
	);
}

export default App;

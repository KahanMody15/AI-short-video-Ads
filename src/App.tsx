import Navbar from './components/Navbar';
import Home from './pages/Home';
import SoftBackdrop from './components/SoftBackdrop';
import Footer from './components/Footer';
import LenisScroll from './components/lenis';
import { Route, Routes } from 'react-router-dom';
import Generator from './pages/Generator';
import Result from './pages/Result';
import MyGenerations from './pages/MyGenerations';
import Community from './pages/Community';
import Plans from './pages/Plans';
import Loading from './pages/Loading';
import Auth from './pages/Auth';
import { AuthProvider } from './contexts/AuthContext';

function App() {
	return (
		<AuthProvider>
			<SoftBackdrop />
			<LenisScroll />
			<Navbar />
            <Routes>
				<Route path='/' element = {<Home />} />
				<Route path='/auth' element = {<Auth />} />
				<Route path='/generate' element = {<Generator />} />
				<Route path='/result/:projectId' element = {<Result />} />
				<Route path='/my-generations' element = {<MyGenerations />} />
				<Route path='/community' element = {<Community />} />
				<Route path='/plans' element = {<Plans />} />
				<Route path='/loading' element = {<Loading />} />
			</Routes>
			<Footer />
		</AuthProvider>
	);
}
export default App;
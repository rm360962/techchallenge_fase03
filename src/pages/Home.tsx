import Header from '../components/Header.tsx';
import { TPageProps } from '../types/TPage.ts';

const Home = (props : TPageProps) => {
	return (
		<>
			<Header {...props}></Header>
		</>
	)
};

export default Home;
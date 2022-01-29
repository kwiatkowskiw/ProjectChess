import { Link } from 'react-router-dom';
import style from './Content.module.css';
import Zoom from 'react-reveal/Zoom';

const Content = () => {
	return (
		<div className={`${style.content}`}>
			<div className='container'>
				<Zoom top>
					<div className='row'>
						<div className='col'>
							<Link to='/play'>
								<div className={`${style.styleButton}`}>
									<p>Nowa Gra</p>
								</div>
							</Link>
						</div>
						<div className='col'>
							<Link to='/puzzles'>
								<div className={`${style.styleButton}`}>
									<p>Puzzle Szachowe</p>
								</div>
							</Link>
						</div>
					</div>
				</Zoom>
			</div>
		</div>
	);
};

export default Content;

import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import style from './Puzzles.module.css';
import LoadingIcon from '../../../UI/LoadingIcon/LoadingIcon';
import Flip from 'react-reveal/Flip';

const Puzzles = () => {
	let { pathname } = useLocation();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1500);
	});

	return (
		<div className={`${style.content}`}>
			{loading ? (
				<LoadingIcon />
			) : (
				<div className={`container`}>
					<Flip top>
						<div className={`row`}>
							<div className='col'>
								<Link to={`${pathname}/level1`}>
									<div className={`${style.styleButton}`}>
										<p>Poziom 1</p>
									</div>
								</Link>
							</div>
							<div className='col'>
								<Link to={`${pathname}/level2`}>
									<div className={`${style.styleButton}`}>
										<p>Poziom 2</p>
									</div>
								</Link>
							</div>
						</div>
						<div className={`row`}>
							<div className='col'>
								<Link to={`${pathname}/level3`}>
									<div className={`${style.styleButton}`}>
										<p>Poziom 3</p>
									</div>
								</Link>
							</div>
							<div className='col'>
								<Link to={`${pathname}/level4`}>
									<div className={`${style.styleButton}`}>
										<p>Poziom 4</p>
									</div>
								</Link>
							</div>
						</div>
						<div className={`row`}>
							<div className='col'>
								<Link to={`${pathname}/level5`}>
									<div className={`${style.styleButton}`}>
										<p>Poziom 5</p>
									</div>
								</Link>
							</div>
							<div className='col'>
								<Link to={`${pathname}/level6`}>
									<div className={`${style.styleButton}`}>
										<p>Poziom 6</p>
									</div>
								</Link>
							</div>
						</div>
						<div className={`row`}>
							<div className='col'>
								<Link to={`${pathname}/level7`}>
									<div className={`${style.styleButton}`}>
										<p>Poziom 7</p>
									</div>
								</Link>
							</div>
							<div className='col'>
								<Link to={`${pathname}/level8`}>
									<div className={`${style.styleButton}`}>
										<p>Poziom 8</p>
									</div>
								</Link>
							</div>
						</div>
						<div className={`row`}>
							<div className='col'>
								<Link to={`${pathname}/level9`}>
									<div className={`${style.styleButton}`}>
										<p>Poziom 9</p>
									</div>
								</Link>
							</div>
							<div className='col'>
								<Link to={`${pathname}/level10`}>
									<div className={`${style.styleButton}`}>
										<p>Poziom 10</p>
									</div>
								</Link>
							</div>
						</div>
					</Flip>
				</div>
			)}
		</div>
	);
};

export default Puzzles;

import style from './PuzzleModal.module.css';
import Chess from 'chess.js';
import { useEffect, useState } from 'react';
import Board from '../../../../UI/Board/Board';
import '../../../../UI/Board/styles/board.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingIcon from '../../../../UI/LoadingIcon/LoadingIcon';
import whiteRook from '../../../../UI/Board/images/pieces/wR.png';
import whiteKnight from '../../../../UI/Board/images/pieces/wN.png';
import whiteBishop from '../../../../UI/Board/images/pieces/wB.png';
import whiteQueen from '../../../../UI/Board/images/pieces/wQ.png';
import blackRook from '../../../../UI/Board/images/pieces/bR.png';
import blackKnight from '../../../../UI/Board/images/pieces/bN.png';
import blackBishop from '../../../../UI/Board/images/pieces/bB.png';
import blackQueen from '../../../../UI/Board/images/pieces/bQ.png';

const PuzzleModal = ({ apiId, nextLevelLocation, labelForLevel }) => {
	const [loading, setLoading] = useState(true);
	const [loadingPosition, setLoadingPosition] = useState(true);
	const [data, setData] = useState([]);
	const [lastMoveToSquare, setLastMoveToSquare] = useState([]);
	const [position, setPosition] = useState();
	const [correctMoveText, setCorrectMoveText] = useState();
	const [header, setHeader] = useState();
	const [piecePromotion, setPiecePromotion] = useState();
	const [saveMovePromotion, setSaveMovePromotion] = useState();
	const [year, setYear] = useState();
	const [orientation, setOrientation] = useState();
	const [correct, setCorrect] = useState(false);
	const [game, setGame] = useState(new Chess());
	const [solution, setSolution] = useState([]);
	let navigate = useNavigate();

	// loading for layer
	useEffect(() => {
		if (loading) {
			setTimeout(() => {
				setLoading(false);
			}, 3000);
		}
	}, [loading]);

	// get data from server
	useEffect(() => {
		async function fetchPosition() {
			try {
				const res = await axios.get(
					'/api/positions/level/' + apiId
				);
				const newPositions = [];
				for (const key in res.data) {
					newPositions.push({ ...res.data[key] });
				}
				setData(newPositions);
			} catch (ex) {
				console.log(ex.response);
			}
		}

		fetchPosition();
	}, [apiId]);

	useEffect(() => {
		setTimeout(() => {
			newPosition();
		}, 100);
	});

	// loading position
	const newPosition = () => {
		if (loadingPosition && data.length !== 0) {
			let randomGameIndex = Math.floor(Math.random() * data.length);
			game.load(data[randomGameIndex].position);
			setPosition(data[randomGameIndex]._id);
			setLastMoveToSquare([]);
			setCorrectMoveText(null);
			setSolution(data[randomGameIndex].solution);
			setHeader(data[randomGameIndex].header);
			setYear(data[randomGameIndex].year);
			orientationHandler();
		}
		setLoadingPosition(false);
	};

	// drop move 
	const moveHandler = (touchOfPiece, putOfPiece) => {
		const gameCopy = { ...game };
		if (isPromoted(game, touchOfPiece, putOfPiece) === true) {
			return;
		}

		let move = gameCopy.move({
			from: touchOfPiece,
			to: putOfPiece,
			promotion: 'x',
		});
		if (move === null) {
			setGame(gameCopy);
		} else {
			setTimeout(isCorrectMove(move.san), 500);
		}
		checkLastMove();
	};

	// check dropped move with solution
	const isCorrectMove = (firstMove) => {
		const gameCopy = { ...game };
		const copySolution = [...solution];
		const moveFromSolution = copySolution[0];
		const nextMoveFromSolution = copySolution[1];
		if (firstMove === moveFromSolution) {
			if (gameCopy.in_checkmate() || copySolution.length === 1) {
				const removeIndex = data.findIndex((item) => item._id === position);
				data.splice(removeIndex, 1);
				setCorrect(true);
				setCorrectMoveText(true);
			} else {
				gameCopy.move(nextMoveFromSolution);
				setSolution(copySolution.slice(2));
				setCorrectMoveText(true);
				setGame(gameCopy);
			}
		} else {
			gameCopy.undo();
			setGame(gameCopy);
			setCorrectMoveText(false);
		}
	};

	// check last move on the board
	const checkLastMove = () => {
		let moves = game.history({ verbose: true });
		if (moves.length > 0) {
			let lastMoveOfHistory = moves[moves.length - 1];
			lastMoveToSquare[0] = lastMoveOfHistory.from;
			lastMoveToSquare[1] = lastMoveOfHistory.to;
			setLastMoveToSquare(lastMoveToSquare);
		}
	};

	// check orientation board 
	const orientationHandler = () => {
		let orientationMove = game.turn();
		if (orientationMove === 'b') {
			setOrientation('black');
		} else {
			setOrientation('white');
		}
	};

	// function for press button "Przejdź do następnej pozycji"
	const handleClickNextPosition = () => {
		setLoading(true);
		setLoadingPosition(true);
		setCorrect(false);
	};

	// check promotion on the board
	const isPromoted = (game, from, to) => {
		const movesAll = game.moves({ verbose: true });
		for (let i = 0, len = movesAll.length; i < len; i++)
			if (
				movesAll[i].flags.indexOf('p') !== -1 &&
				movesAll[i].from === from &&
				movesAll[i].to === to
			) {
				setSaveMovePromotion([from, to]);
				if (movesAll[i].color === 'w') {
					setPiecePromotion('white');
				} else {
					setPiecePromotion('black');
				}
				return true;
			}
	};

	// set promotion on the board
	const promotion = (pieceType) => {
		let move = null;
		const from = saveMovePromotion[0];
		const to = saveMovePromotion[1];
		const gameCopy = { ...game };
		move = gameCopy.move({ from, to, promotion: pieceType });
		setGame(gameCopy);
		setTimeout(isCorrectMove(move.san), 500);
		checkLastMove();
		setPiecePromotion('');
	};

	return (
		<div className={`${style.content}`}>
			{loading ? (
				<LoadingIcon />
			) : (
				<div className={`container`}>
					<div className='row'>
						<div className='col'>
							<div className='dimensions'>
								<Board
									width='680px'
									height='680px'
									onMove={moveHandler}
									fen={game.fen()}
									orientation={orientation}
									lastMove={lastMoveToSquare}
								/>
								{piecePromotion === 'white' && (
									<div className='promotion-modal'>
										<div className='promotion-body'>
											<span onClick={() => promotion('r')}>
												<img src={whiteRook} alt='' />
											</span>
											<span onClick={() => promotion('n')}>
												<img src={whiteKnight} alt='' />
											</span>
											<span onClick={() => promotion('b')}>
												<img src={whiteBishop} alt='' />
											</span>
											<span onClick={() => promotion('q')}>
												<img src={whiteQueen} alt='' />
											</span>
										</div>
									</div>
								)}
								{piecePromotion === 'black' && (
									<div className='promotion-modal'>
										<div className='promotion-body'>
											<span onClick={() => promotion('r')}>
												<img src={blackRook} alt='' />
											</span>
											<span onClick={() => promotion('n')}>
												<img src={blackKnight} alt='' />
											</span>
											<span onClick={() => promotion('b')}>
												<img src={blackBishop} alt='' />
											</span>
											<span onClick={() => promotion('q')}>
												<img src={blackQueen} alt='' />
											</span>
										</div>
									</div>
								)}
							</div>
						</div>
						<div className='col bg-light'>
							<div className='card'>
								<h5 className='card-header text-center'>{header}</h5>
								<h5 className='card-header text-center'>{year}</h5>
								<div className='card-body text-center'>
									{orientation === 'white' ? (
										<h2 className='card-title'>Ruch Białych</h2>
									) : (
										<h2 className='card-title'>Ruch Czarnych</h2>
									)}
									{correctMoveText === true && (
										<p className={`${style.correctMove} text-center`}>
											Prawidłowy Ruch
										</p>
									)}
									{correctMoveText === false && (
										<p className={`${style.incorrectMove} text-center`}>
											Błędny ruch. Spróbuj ponownie
										</p>
									)}
								</div>
							</div>
							{data.length === 0 && (
								<div className={`${style.correctSolution}`}>
									<p>
										Brawo! Rozwiązałeś wszystkie zadania z Poziomu{' '}
										{labelForLevel}
									</p>
									<button
										type='button'
										className='btn btn-secondary'
										onClick={() => {
											navigate('/puzzles/' + nextLevelLocation);
										}}
									>
										Przejdź do następnego poziomu
									</button>
								</div>
							)}
							{correct && data.length !== 0 && (
								<div className={`${style.correctSolution}`}>
									<p>Prawidłowo rozwiązane zadanie!</p>
									<button
										type='button'
										className='btn btn-secondary'
										onClick={handleClickNextPosition}
									>
										Przejdź do następnego zadania
									</button>
								</div>
							)}
							<div className={`${style.buttonRedirect}`}>
								<button
									type='button'
									className='btn btn-success'
									onClick={() => {
										navigate('/puzzles');
									}}
								>
									Wróć do menu zagadek
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PuzzleModal;

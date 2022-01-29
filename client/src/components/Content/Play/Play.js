import style from './Play.module.css';
import Chess from 'chess.js';
import { useState } from 'react';
import Board from '../../../UI/Board/Board';
import '../../../UI/Board/styles/board.css';
import whiteRook from '../../../UI/Board/images/pieces/wR.png';
import whiteKnight from '../../../UI/Board/images/pieces/wN.png';
import whiteBishop from '../../../UI/Board/images/pieces/wB.png';
import whiteQueen from '../../../UI/Board/images/pieces/wQ.png';
import blackRook from '../../../UI/Board/images/pieces/bR.png';
import blackKnight from '../../../UI/Board/images/pieces/bN.png';
import blackBishop from '../../../UI/Board/images/pieces/bB.png';
import blackQueen from '../../../UI/Board/images/pieces/bQ.png';

const Play = () => {
	const [game, setGame] = useState(new Chess());
	const [saveMovePromotion, setSaveMovePromotion] = useState();
	const [lastMoveToSquare, setLastMoveToSquare] = useState([]);
	const [moves, setMoves] = useState([]);
	const [piecePromotion, setPiecePromotion] = useState('');

	// drop move
	const moveHandler = (touchOfPiece, putOfPiece) => {
		const gameCopy = { ...game };
		isPromoted(gameCopy, touchOfPiece, putOfPiece);
		let move = gameCopy.move({
			from: touchOfPiece,
			to: putOfPiece,
			promotion: 'x',
		});
		if (move === null) {
			setGame(gameCopy);
		} 
		else 
		{
			chessNotation(move.color, move.san);
		}
		setGame(gameCopy);
		checkLastMove();
	};

	// notation of moves
	const chessNotation = (color, move) => {
		if (color === 'w') {
			const arrayMoves = [
				...moves,
				{
					id: moves.length + 1,
					whiteMove: move,
					blackMove: null,
				},
			];
			setMoves(arrayMoves);
		}
		if (color === 'b') {
			let updatedMoveBlack = moves.map((movesItems) => {
				if (movesItems.id === moves.length) {
					return { ...movesItems, blackMove: move };
				}
				return movesItems;
			});
			setMoves(updatedMoveBlack);
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
		const from = saveMovePromotion[0];
		const to = saveMovePromotion[1];
		const gameCopy = { ...game };
		let move = gameCopy.move({ from, to, promotion: pieceType });
		chessNotation(move.color, move.san);
		setGame(gameCopy);
		checkLastMove();
		setPiecePromotion('');
	};

	return (
		<div className={`${style.content}`}>
			<div className={`container`}>
				<div className='row'>
					<div className='col'>
						<div className='dimensions'>
							<Board
								width='680px'
								height='680px'
								onMove={moveHandler}
								fen={game.fen()}
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
					<div className={`${style.tableList} col bg-dark`}>
						<table className={`table table-hover table-dark text-center`}>
							<thead>
								<tr>
									<th scope='col'>#</th>
									<th scope='col'>White</th>
									<th scope='col'>Black</th>
								</tr>
							</thead>
							<tbody>
								{moves.map((item) => {
									return (
										<tr key={item.id}>
											<th scope='row'>{item.id}</th>
											<td>{item.whiteMove}</td>
											<td>{item.blackMove}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Play;

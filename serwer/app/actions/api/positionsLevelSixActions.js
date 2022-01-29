const ModalDatabase = require('../../db/models/positionsLevel');
const PositionsLevelSix = ModalDatabase.createSix;

class PositionsLevelSixActions {
	async createPosition(req, res) {
		let positionUnique;
		const header = req.body.header;
		const year = req.body.year;
		const position = req.body.position;
		const move = req.body.move;
		const solution = req.body.solution;
		try {
			positionUnique = new PositionsLevelSix({
				header: header,
				year: year,
				position: position,
				move: move,
				solution: solution,
			});
			await positionUnique.save();
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
		res.status(201).json(positionUnique);
	}
	async getAllPositions(req, res) {
		let positions;
		try {
			positions = await PositionsLevelSix.find({});
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
		res.set('Access-Control-Allow-Origin', '*');
		res.status(201).json(positions);
	}
	async getPosition(req, res) {
		const id = req.params.id;
		let position;
		try {
			position = await PositionsLevelSix.findOne({ _id: id });
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
		res.status(201).json(position);
	}

}

module.exports = new PositionsLevelSixActions();

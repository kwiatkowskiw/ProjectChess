const ModalDatabase = require('../../db/models/positionsLevel');
const PositionsLevelSeven = ModalDatabase.createSeven;

class PositionsLevelSevenActions {
	async createPosition(req, res) {
		let positionUnique;
		const header = req.body.header;
		const year = req.body.year;
		const position = req.body.position;
		const move = req.body.move;
		const solution = req.body.solution;
		try {
			positionUnique = new PositionsLevelSeven({
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
			positions = await PositionsLevelSeven.find({});
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
			position = await PositionsLevelSeven.findOne({ _id: id });
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
		res.status(201).json(position);
	}
}

module.exports = new PositionsLevelSevenActions();

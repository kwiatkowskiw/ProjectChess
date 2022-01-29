const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// modal
const positionsLevelSchema = new Schema({
	header: {
		type: String,
		required: [true, 'Nagłówek jest wymagany'],
	},
	year: {
		type: String,
	},
	position: {
		type: String,
		required: [true, 'Pozycja jest wymagana'],
	},
	solution: {
		type: Array,
		required: [true, 'Rozwiązanie jest wymagane'],
	},
});

positionsLevelSchema.post('save', (err, doc, next) => {
	if (err.code === '11000') {
		err.errors = { position: { message: 'Istnieje taka pozycja w bazie' } };
	}
	next();
});

const createOne = mongoose.model('PositionsLevelOne', positionsLevelSchema);
const createTwo = mongoose.model('PositionsLevelTwo', positionsLevelSchema);
const createThree = mongoose.model('PositionsLevelThree', positionsLevelSchema);
const createFour = mongoose.model('PositionsLevelFour', positionsLevelSchema);
const createFive = mongoose.model('PositionsLevelFive', positionsLevelSchema);
const createSix = mongoose.model('PositionsLevelSix', positionsLevelSchema);
const createSeven = mongoose.model('PositionsLevelSeven', positionsLevelSchema);
const createEight = mongoose.model('PositionsLevelEight', positionsLevelSchema);
const createNine = mongoose.model('PositionsLevelNine', positionsLevelSchema);
const createTen = mongoose.model('PositionsLevelTen', positionsLevelSchema);

module.exports = {
	createOne,
	createTwo,
	createThree,
	createFour,
	createFive,
	createSix,
	createSeven,
	createEight,
	createNine,
	createTen,
};

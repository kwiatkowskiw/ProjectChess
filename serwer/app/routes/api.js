const express = require('express');
const router = express.Router();

const UserActions = require('../actions/api/userActions');
const PositionsLevelOne = require('../actions/api/positionsLevelOneActions')
const PositionsLevelTwo = require('../actions/api/positionsLevelTwoActions')
const PositionsLevelThree = require('../actions/api/positionsLevelThreeActions')
const PositionsLevelFour = require('../actions/api/positionsLevelFourActions')
const PositionsLevelFive = require('../actions/api/positionsLevelFiveActions')
const PositionsLevelSix = require('../actions/api/positionsLevelSixActions')
const PositionsLevelSeven = require('../actions/api/positionsLevelSevenActions')
const PositionsLevelEight = require('../actions/api/positionsLevelEightActions')
const PositionsLevelNine = require('../actions/api/positionsLevelNineActions')
const PositionsLevelTen = require('../actions/api/positionsLevelTenActions')

// create user
router.post('/login', UserActions.createUser);
// get users
router.get('/login', UserActions.getAllUsers);
// get user
router.get('/login/:id', UserActions.getUser);
// delete user
router.delete('/login/:id', UserActions.deleteUser);

// create position
router.post('/positions/level/one', PositionsLevelOne.createPosition);
// get all positions
router.get('/positions/level/one', PositionsLevelOne.getAllPositions);
// get specific position
router.get('/positions/level/one/:id', PositionsLevelOne.getPosition);

router.post('/positions/level/two', PositionsLevelTwo.createPosition);
router.get('/positions/level/two', PositionsLevelTwo.getAllPositions);
router.get('/positions/level/two/:id', PositionsLevelTwo.getPosition);

router.post('/positions/level/three', PositionsLevelThree.createPosition);
router.get('/positions/level/three', PositionsLevelThree.getAllPositions);
router.get('/positions/level/three/:id', PositionsLevelThree.getPosition);

router.post('/positions/level/four', PositionsLevelFour.createPosition);
router.get('/positions/level/four', PositionsLevelFour.getAllPositions);
router.get('/positions/level/four/:id', PositionsLevelFour.getPosition);

router.post('/positions/level/five', PositionsLevelFive.createPosition);
router.get('/positions/level/five', PositionsLevelFive.getAllPositions);
router.get('/positions/level/five/:id', PositionsLevelFive.getPosition);

router.post('/positions/level/six', PositionsLevelSix.createPosition);
router.get('/positions/level/six', PositionsLevelSix.getAllPositions);
router.get('/positions/level/six/:id', PositionsLevelSix.getPosition);

router.post('/positions/level/seven', PositionsLevelSeven.createPosition);
router.get('/positions/level/seven', PositionsLevelSeven.getAllPositions);
router.get('/positions/level/seven/:id', PositionsLevelSeven.getPosition);

router.post('/positions/level/eight', PositionsLevelEight.createPosition);
router.get('/positions/level/eight', PositionsLevelEight.getAllPositions);
router.get('/positions/level/eight/:id', PositionsLevelEight.getPosition);

router.post('/positions/level/nine', PositionsLevelNine.createPosition);
router.get('/positions/level/nine', PositionsLevelNine.getAllPositions);
router.get('/positions/level/nine/:id', PositionsLevelNine.getPosition);

router.post('/positions/level/ten', PositionsLevelTen.createPosition);
router.get('/positions/level/ten', PositionsLevelTen.getAllPositions);
router.get('/positions/level/ten/:id', PositionsLevelTen.getPosition);

module.exports = router;
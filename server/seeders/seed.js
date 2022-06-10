const db = require('../config/connection');
const { Restroom } = require('../models');
const restroomSeeds = require('./restroomSeeds.json');

db.once('open', async () => {
 await Restroom.deleteMany({});
  await Restroom.create(restroomSeeds);

  console.log('all done!');
  process.exit(0);
});
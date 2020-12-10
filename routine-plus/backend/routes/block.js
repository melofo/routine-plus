const router = require('express').Router();
let Block = require('../models/block.model');

router.route('/').get((req, res) => {
  Block.find()
    .then(blocks => res.json(blocks))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const image = req.body.image;
  const task = req.body.task;
  const routine = req.body.routine;
  const date = Date.parse(req.body.date);
  const newBlock = new Block({
    image,
    task,
    routine,
    date,
  });
  newBlock.save()
  .then(() => res.json('Block added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Block.findById(req.params.id)
    .then(block => res.json(block))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Block.findByIdAndDelete(req.params.id)
    .then(() => res.json('Block deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').patch((req, res) => {
  Block.findById(req.params.id)
    .then(block => {
      block.task = req.body.task;
      block.routine = req.body.routine;
      block.date = Date.parse(req.body.date);
      block.save()
        .then(() => res.json('Block updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
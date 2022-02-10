const Service = require('../models/services.model');
const TimeEmitter = require('../timeEmitter');
const Triggers = require('../events');

let triggers = new Triggers();
let timeEmitter = new TimeEmitter();
let triggersMap = new Map();

triggers.resetTriggers();

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can't be empty!"
    });
  }
  const service = new Service({
    type: req.body.type,
    value: req.body.value,
    user_id: req.body.user_id,
    reaction: req.body.reaction,
    reaction_arg: req.body.reaction_arg
    // type: 'cocktail',
    // value: '20:43',
    // user_id: 'totototoot',
    // reaction: 'sendMsgSlack',
    // reaction_arg: 'tototototo'
  });
  Service.create(service, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Somme error occurred'
      });
    else {
      res.send(data);
      triggersMap.set(data.id, data);
      if (!timeEmitter.start) {
        triggers.setTriggers();
        timeEmitter.startInterval(function() {
          triggers.emitOnTriggers(triggersMap);
        });
      }
    }
  });
};

exports.findOne = (req, res) => {
  Service.findById(req.params.user_id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Service with id ${req.params.user_id}.`
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Service with id ' + req.params.user_id
        });
      }
    } else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Service.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Somme error occurred.'
      });
    else res.send(data);
  });
};

exports.deleteById = (req, res) => {
  Service.removeById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Service with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Service with id ' + req.params.id
        });
      }
    } else {
      res.send({ message: `Service was deleted successfully!` });
      triggersMap.delete(parseInt(req.params.id));
    }
  });
};

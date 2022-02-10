const sql = require('./db');

const Service = function(service) {
  this.type = service.type;
  this.value = service.value;
  this.user_id = service.user_id;
  this.reaction = service.reaction;
  this.reaction_arg = service.reaction_arg;
};

Service.create = (newService, result) => {
  sql.query('INSERT INTO services SET ?', newService, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log('created service: ', { id: res.insertId, ...newService });
    result(null, { id: res.insertId, ...newService });
  });
};

Service.findById = (user_id, result) => {
  sql.query(
    `SELECT * FROM services WHERE user_id = '${user_id}'`,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log('found service: ', res);
        result(null, res);
        return;
      }
      result({ kind: 'not_found' }, null);
    }
  );
};

Service.getAll = result => {
  sql.query('SELECT * FROM services', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    console.log('services: ', res);
    result(null, res);
  });
};

Service.removeById = (id, result) => {
  sql.query(`DELETE FROM services WHERE id = '${id}'`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: 'not_found' }, null);
    }
    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};

module.exports = Service;

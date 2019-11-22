const UserModel = require('../models/UserModel');

const create = (req, res) => {
  let { firstname, lastname, email, password, age, team } = req.body;
  let user = new UserModel({ firstname, lastname, email, password, age, team });

  user
    .save()
    .then(result =>
      res.json({ success: true, message: 'User created', result })
    )
    .catch(err => {
      console.log(err);
      res.json({
        success: false,
        error: err.message
      });
    });
};

const update = (req, res) => {
  const user = req.body;
  const { _id } = user;

  if (!_id) return res.json({ success: false, message: 'User id required' });

  UserModel.updateOne({ _id }, user)
    .then(result => {
      if (result.n < 1)
        return res.json({
          success: false,
          message: 'User does not exist',
          result
        });
      if (result.nModified < 1)
        return res.json({
          success: true,
          message: 'User details does not changed',
          result
        });
      return res.json({ success: true, message: 'User updated', result });
    })
    .catch(err => {
      console.log(err);
      res.json({
        success: false,
        error: err.message
      });
    });
};

const retreive = (req, res) => {
  const conditions = {};
  const projection = { _id: 0, __v: 0 };
  const options = { skip: 0, limit: 3 };

  UserModel.find(conditions, projection, options)
    .then(result => {
      if (!result)
        return res.json({
          success: false,
          message: 'Nothink found',
          result
        });
      return res.json({ success: true, message: 'Users found', result });
    })
    .catch(err => {
      console.log(err);
      res.json({
        success: false,
        error: err.message
      });
    });
};

const remove = (req, res) => {
  const { _id } = req.body;

  if (!_id) return res.json({ success: false, message: 'User id required' });

  UserModel.deleteOne({ _id })
    .then(result => {
      if (!result.deletedCount < 1)
        return res.json({
          success: false,
          message: 'User delete failed',
          result
        });
      return res.json({ success: true, message: 'User deleted', result });
    })
    .catch(err => {
      console.log(err);
      res.json({
        success: false,
        error: err.message
      });
    });
};

module.exports = { create, update, retreive, remove };

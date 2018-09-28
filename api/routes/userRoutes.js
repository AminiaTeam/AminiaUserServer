'use-strict'
module.exports = function(app){
  const user = require('../controllers/userController');

  app.route("/users")
    .get(user.getAllUsers)
    .post(user.createUser)

  app.route('/users/:userId')
    .get(user.getUserById)
    .delete(user.deleteUser);

  app.route('/users/login')
    .post(user.authenticateUser)

}

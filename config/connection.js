const { connect, connection } = require('mongoose');

connect('mongodb://localhost:27017/');

// Export the connection
module.exports = connection
const jwt = require('jsonwebtoken');
require('dotenv').config();

const token = jwt.sign({ username: 'testuser' }, process.env.JWT_SECRET, { expiresIn: '1h' });
console.log(token);

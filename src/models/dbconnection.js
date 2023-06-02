// libraries
const mongoose = require('mongoose');

// constants



// connection to the database
mongoose.connect('mongodb://127.0.0.1:27017/personalfinance', {
     useNewUrlParser: true, useUnifiedTopology: true 
    });

// handle connection events
mongoose.connection.on('error', (err) => {
  console.error('Database connection error:', err);
});

mongoose.connection.on('open', () => {
  console.log('Database connection established');
});

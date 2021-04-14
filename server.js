const express = require('express');
const connectDB = require('./config/db');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;
//connect database
connectDB();

//init Middleware //body parser
app.use(express.json({ extended: false }));

//Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/post', require('./routes/api/post'));
app.use('/api/profile', require('./routes/api/profile'));

//serve static assets in production
if (process.env.NODE.ENV === 'production') {
  //set  static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html'));
  });
}
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('.authentication.js');  

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());  
app.use('/authentication.js', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

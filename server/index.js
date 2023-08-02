const express= require('express');
const app = express();
const cors = require('cors');
const cowsRouter = require('./components/cows/route');
const examRouter = require('./components/examinations/route')
const milkRouter = require('./components/milk/route')
const birthRouter = require('./components/births/route')


app.use(express.json());
app.use(cors());


app.use('/api/cows', cowsRouter);

app.use('/api/examinations', examRouter);

app.use('/api/milk', milkRouter);

app.use('/api/births', birthRouter);


const PORT = 5000;


app.listen(PORT, () => {
    console.log('server is listening on port 5000');
})


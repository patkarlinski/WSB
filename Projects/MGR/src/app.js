import app from './server.js'
import connectToDatabase from './database.js';

//DB connect 
connectToDatabase ();

//sever app
const PORT = 3000;
app.listen(PORT, (err) => {
    if (err){
        console.log(`Error is here ${err}`)
        process.exit(1);
    }
    console.log(`App listening on port ${PORT}`);
});
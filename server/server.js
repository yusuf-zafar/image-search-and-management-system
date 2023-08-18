const app = require('./app')

require("dotenv").config();
const connectDatabase = require("./config/db");

connectDatabase();


const server = app.listen(5000,()=>{
    console.log(`Server is running at http://localhost:${5000}`)
});

process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    });
});
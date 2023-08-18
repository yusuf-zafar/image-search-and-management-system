const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose
        .connect("mongodb+srv://iamyusuf:beO681ktSQkT5ig0@sanatannepalicalendar.3tsklgi.mongodb.net/?retryWrites=true&w=majority",{ dbName: 'image-management' })
        .then((data) => {
            console.log(
                `mongodb connected with server ${data.connection.host}`
            );
        }) .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
      });;
};

module.exports = connectDatabase;

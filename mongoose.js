const mongoose = require('mongoose');
const Category = require('./models/category.model');

module.exports.connect = () => {
    return mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {useNewUrlParser: true})
        .then(() => {
            Category.insertMany([
                {
                    name: 'Business'
                },
                {
                    name: 'World'
                },
                {
                    name: 'Politics'
                },
                {
                    name: 'Sports'
                },
                {
                    name: 'Health'
                }
            ]).then(() => {
                console.log('Categories added');
            }).catch(console.log);
            console.log('Connected to mongo db');
        });
};
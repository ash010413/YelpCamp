const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i=0;i<200;i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "61272610653aff05485491b2",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi optio modi animi esse minus, dolorum, quos rerum odit explicabo, aliquam sit. Ducimus, ea sit pariatur atque consequuntur suscipit unde reiciendis',
            price,
            geometry: {
                    type: "Point",
                    coordinates: [
                      cities[random1000].longitude,
                      cities[random1000].latitude
                    ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dwghalhn4/image/upload/v1631024240/YelpCamp/el2w2bg46kk3bbaswv4k.jpg',
                  filename: 'YelpCamp/pejjiccwez4nvhsrfdbx'
                },
                {
                  url: 'https://res.cloudinary.com/dwghalhn4/image/upload/v1630511523/YelpCamp/sqskqnkinoj4ecg0ky45.jpg',
                  filename: 'YelpCamp/luglubzsagskgnqmgt7y'
                }
              ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useUnifiedTopology: true,  useNewUrlParser: true });

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified!"]
  },
  rating: {
    type: Number,
    min:1,
    max:10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  name: "Pine Apple",
  rating: 8,
  review: "Great Fruit"
});

fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person",personSchema);
const person = new Person({
  name:"Amy",
  age: 12,
  favouriteFruit: fruit
});

// person.save();

Person.updateOne({name: "Spuegeon"}, {favouriteFruit:fruit}, function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("Successfully Updated the document");
  }
});
// const mango = new Fruit({
//   name: "Mango",
//   rating: 10,
//   review: "Best Fruit Out There"
// });
//
// const banana = new Fruit({
//   name: "Banana",
//   rating: 8,
//   review: "Nice Fruit"
// });
//
// const orange = new Fruit({
//   name: "Orange",
//   rating: 7,
//   review: "Need to Peel the scalp"
// });

// Fruit.insertMany([mango, banana, orange], (err) => {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("Successfully saved to FruitsDB");
//   }
// });

Fruit.find(function(err,fruits) {
  if(err) {
    console.log(err);
  } else {
    mongoose.connection.close();
    // console.log(fruits);
    fruits.forEach(function(fruit) {
      console.log(fruit.name);
    })
  }
});

// Fruit.updateOne({_id:"5e9c44db201f373438c166d3"}, {name: "Peach"}, function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("Successfully Updated");
//   }
// });

// Fruit.deleteOne({_id:"5e9c44db201f373438c166d3"}, function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted from the database.");
//   }
// });

// Person.deleteMany({name:"Spuegeon"}, function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted all the documents")
//   }
// });

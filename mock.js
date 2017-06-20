const faker = require('faker');
const fs = require('fs');
const path = require('path');

let reviews = [];

for (let i = 0; i < 10; i++) {
  let review = {
    name: faker.name.findName(),
    quote: faker.hacker.phrase()
  }
  reviews.push(review)
}
console.log(reviews);

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionUrl = "mongodb://127.0.0.1:27017";
const dbname = "task5";

MongoClient.connect(connectionUrl, (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db(dbname);

    // Insert 1 user using insertOne
    db.collection('users').insertOne({
        name: 'Ahmed',
        age: 30
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert user');
        }
        console.log(result.modifiedCount);
    })

    // insert another user uning insertOne
    db.collection('users').insertOne({
        name: 'Islam',
        age: 20
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert user');
        }
        console.log(result.modifiedCount);
    })

    // Insert 10 users using insertMany - 5 of them has 27y
    db.collection('users').insertMany([
        {
            name: 'Aya',
            age: 27
        },
        {
            name: 'Omnya',
            age: 27
        },
        {
            name: 'Hoda',
            age: 27
        },
        {
            name: 'Mohamed',
            age: 27
        },
        {
            name: 'Gamal',
            age: 27
        },
        {
            name: 'Dina',
            age: 21
        },
        {
            name: 'Ola',
            age: 25
        },
        {
            name: 'Osama',
            age: 31
        },
        {
            name: 'Abdullah',
            age: 22
        },
        {
            name: 'Dalia',
            age: 17
        }
    ], (err, result) => {
        if (err) {
            return console.log('Unable to insert user');
        }
        console.log(result.modifiedCount);
    })

    // find all users with 27y
    db.collection('users').find({ age: 27 }).toArray((err, users) => {
        if (err) {
            return console.log('Unable to fetch');
        }
        console.log(users);
    })

    // limit the number of users to 3 
    db.collection('users').find({ age: 27 }).limit(3).toArray((err, users) => {
        if (err) {
            return console.log('Unable to fetch');
        }
        console.log(users);
    })

    //update the first 4 users names
    const usersToUpdate = db.collection('users').find({}).limit(4);
    usersToUpdate.forEach((user) => {
        db.collection('users').updateOne(
            { _id: user._id },
            { $set: { name: 'Ayman' } }
        ).then((user) => {
            console.log(user.modifiedCount);
        }).catch((err) => {
            console.log(err);
        })
    })

    //update the first 4 users inc age by 4
    usersToUpdate.forEach((user) => {
        db.collection('users').updateOne(
            { _id: user._id },
            { $inc: { age: 4 } }
        ).then((user) => {
            console.log(user.modifiedCount);
        }).catch((err) => {
            console.log(err);
        })
    })

    //update users increase age by 10
    db.collection('users').updateMany({},
        { $inc: { age: 10 } }
    ).then((result) => {
        console.log(result.modifiedCount);
    }).catch((err) => {
        console.log(err);
    })

    //delete all users by age=41
    db.collection('users').deleteMany({ age: 41 })
        .then((result) => {
            console.log(result.deletedCount);
        }).catch((err) => {
            console.log(err);
        })
})
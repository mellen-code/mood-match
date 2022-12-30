const express = require('express')
const app = express()
const cors = require('cors')
const { response } = require('express')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'diva-moods',
    collection

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
    
const PORT = 8000

MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log('Connected to database')
        db = client.db(dbName)
        collection = db.collection('moods')


    app.get('/', (req, res) => {
        try{
            res.render('index.ejs')
        }
        catch{(error => console.error(error))}
    })

    app.get('/api/:mood', (req, res) => {
        const mood = req.params.mood.toLowerCase();

        collection.find({name: mood}.toArray())
        
        .then(results => {
            console.log(results)
            res.json(results[0])
        })
        .catch(error => console.error(error))
    })

})
.catch(error => console.error(error))



app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})





// Set up Mongo Connection:
// MongoClient.connect(connectionString, {useUnifiedTopology: true, useNewUrlParser: true})
//     .then(client => {
//         console.log('Connected to Database')
//         const db = client.db('field-guide-to-aliens')
//         const infoCollection = db.collection('field-guide-to-aliens-info')
   
//     app.get('/', (request, response) => {
//         response.sendFile(__dirname, '/index.html')
//     })

//     app.get('/api/:alienName', (request, response) => {
//         const entry = request.params.alienName.toLowerCase();
//             // if (aliens[entry]) {
//             //     response.json(aliens[entry])
//             // } else {
//             //     response.json(aliens['humans'])
//             // }
            
//         // Code for hit MongoDB db to pull requested data:
//         infoCollection.find({name: entry}).toArray()
//         .then(results => {
//             console.log(results)
//             response.json(results[0])
//         })
//         .catch(error => console.error(error))
//     })

// })
// .catch(error => console.error(error))
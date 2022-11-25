const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

const PORT = 8000

const cherMoods = {
    'happy': {
        'image': 'This will be a diva image',
        'imageCaption': 'CC credit goes here'
    },
    'diva': {
        'image': 'This will be a diva image',
        'imageCaption': 'CC credit goes here'
    },
    'feisty': {
        'image': 'This will be a fiesty image',
        'imageCaption': 'CC credit goes here'
    },
    'blue': {
        'image': 'This will be a blue image',
        'imageCaption': 'CC credit goes here'
    }
}

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

app.get('/api/:mood', (request, response) => {
    const userMood = request.params.mood.toLowerCase()

    if (cherMoods[userMood]) {
        response.json(cherMoods[userMood])
    }else {
        response.json(cherMoods['default'])
    }
})

app.listen(process.env.PORT || PORT, () => {
    console.log('Server is running')
})
const express= require('express')
const { urlencoded } = require('express')

const app = express()
const db = require('./db')
app.use(express.json()) // pass json objects
app.use(urlencoded({ extended: true})) // pass url encoded objects

// first route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'success'
    })
})

// create
app.post('/create', () => {

})

// read all
app.get('/retrieve-all', () => {

})

// get one

app.get('/retrieve/:bookID', () => {

})

// update, 
app.put('/edit/:bookID', () => {

})
// delete
app.delete('/delete/:bookID', () => {

})


// create a server
const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT  }`)
})
const express= require('express')
const { urlencoded } = require('express')

const app = express()
const db = require('./db')

// import book schema
const Book = require('./bookSchema')
app.use(express.json()) // pass json objects
app.use(urlencoded({ extended: true})) // pass url encoded objects

// first route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'success'
    })
})

// create
app.post('/create', (req, res) => {
    // check if book info was passed in
    if (!Object.keys(req.body).length) {
        res.status(400).json({
            success: 'false',
            message: 'Provide book data'
        })
    }

    const {title, author, publisher, read} = (req.body)
    const book = new Book({
        title,
        author,
        publisher,
        read
    })
    book.save().then((data) => {
        res.status(201).json({
            success: true,
            message: 'Created'
        })

    }).catch(err => {
        res.status().json({
            success: false,
            message: err.message
        })
    })
    // create a book
})

// read all
app.get('/retrieve-all', (req ,res) => {
    Book.find({}, (err, data) => {
        if (err) {
            res.status(404).json({
                success: false,
                books: null
            })
        }
        res.status(200).json({
            success: true,
            books: data
        })
    })
})

// get one

app.get('/retrieve/:bookID', (req, res) => {
    Book.findById(req.params.bookID, (err, data) => {
        if (err) {
            res.status(404).json({
                success: false,
                book: null
            })
        }
        res.status(200).json({
            success: true,
            book: data
        })
    })
})

// update, 
app.put('/edit/:bookID', (req, res) => {
    Book.findByIdAndUpdate(req.params.bookID,req.body, {new:true}, (err, result) => {
        if (err) {
            res.status(404).json({
                success: false,
            })
        }
        res.status(200).json({
            success: true,
            book: result
        })
    })
})
// delete
app.delete('/delete/:bookID', (req, res) => {
    Book.findByIdAndDelete(req.params.bookID, (err, result) => {
        if (err) {
            res.status(404).json({
                success: false,
            })
        }
        res.status(200).json({
            success: true,
        })
    })
})


// create a server
const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT  }`)
})
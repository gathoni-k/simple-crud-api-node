const express = require("express");

const app = express();
const db = require("./db");
const { create, readAll, readOne, update,deleteOne, deleteAll } = require("./dbHelpers");
// import book schema
const Book = require("./bookSchema");
app.use(express.json()); // pass json objects
app.use(express.urlencoded({ extended: true })); // pass url encoded objects

// first route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "success",
  });
});

// create
app.post('/create', async (req, res) => {
    //check if req.body is empty
    if (!Object.keys(req.body).length) {
      res.status(400).json({
      message: 'Request body cannot be empty'
    })
    }
    const {title, author, publisher, read} = (req.body)
    // create a record in db
    const book = await create({title, author, publisher, read})
    if (book.error) {
      res.status(500).json({
        message: book.error
      })
    }
    res.status(201).json({
      message: 'New book record created'
    })
})

// read all
app.get("/retrieve-all", async (req, res) => {
    const books = await readAll()
    if (books.error) {
      res.status(500).json({
        message: error.message,
        books: books.data
      })
    }
    res.status(200).json({
        message: 'success',
        books: books.data
      }) 
});

// get one

app.get("/retrieve/:bookID", async (req, res) => {
    const book = await readOne(req.params.bookID)
    if (book.error) {
      res.status(500).json({
        message: book.error,
        books: book.data
      })
    }
    res.status(200).json({
        message: 'success',
        book: book.data
      }) 
});

// update,
app.put("/edit/:bookID", async (req, res) => {
    if (!Object.keys(req.body).length) {
        res.status(400).json({
        message: 'Request body cannot be empty',
        book: null
      })
   }
 
   const book = await update(req.params.bookID, req.body)
   if (book.error) {
     res.status(500).json({
       message: book.error,
       book: book.data
     })
   }
   res.status(200).json({
       message: 'success',
       book: book.data
     }) 
});
// delete
app.delete("/delete/:bookID", async (req, res) => {
    const isDeleted = await deleteOne(req.params.bookID)
    if (isDeleted.error) {
      res.status(500).json({
        message: isDeleted.error,
      })
    }
    res.status(200).json({
        message: 'Deleted Successfully'
      }) 
});
 
app.delete('/delete-all', async (req, res) => {
    const isDeleted = await deleteAll(req)
    if (isDeleted.error) {
      res.status(500).json({
        message: isDeleted.error,
      })
    }
    res.status(200).json({
        message: 'Deleted Successfully'
      }) 
  })
// create a server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

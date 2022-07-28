import express from 'express';
import exphbs from 'express-handlebars';
import mysql from 'mysql';

const app = express();

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home')
})

app.post('/books/insertbook', (req, res) => {
    const title = req.body.title;
    const pageqty = req.body.pageqty;

    const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`;

    conn.query(sql, function(err){
        if(err){
            console.log(err)
            return
        }
    
       res.redirect('/books')
    });
})

app.get('/books', (req, res) => {
    const sql = "SELECT * FROM books";

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }

        const books = data;

        res.render('books', {books})
    })
})

app.get('/books/:id', function (req, res) {
    const id = req.params.id
  
    const query = `SELECT * FROM books WHERE id = ${id}`
  
    conn.query(query, function (err, data) {
      if (err) {
        console.log(err)
      }
  
      const book = data[0]
  
      console.log(data[0])
  
      res.render('book', { book })
    })
  });

  app.get('/books/edit/:id', function (req, res) {
    const id = req.params.id
  
    const query = `SELECT * FROM books WHERE id = ${id}`
  
    conn.query(query, function (err, data) {
      if (err) {
        console.log(err)
      }
  
      const book = data[0]
  
      console.log(data[0])
  
      res.render('editbook', { book })
    })
  });

  app.post('/books/updatebook', (req, res) => {
    const id = req.body.id
    const title = req.body.title
    const pageqty = req.body.pageqty
  
    const sql = `UPDATE books SET title = '${title}', pageqty = '${pageqty}' WHERE id = ${id}`
  
    conn.query(sql, function (err) {
      if (err) {
        console.log(err)
      }
  
      res.redirect(`/books`)
    })
  });

  app.post('/books/remove/:id', function (req, res) {
    const id = req.params.id
  
    const query = `DELETE FROM books WHERE id = ${id}`
  
    conn.query(query, function (err) {
      if (err) {
        console.log(err)
      }
  
      res.redirect(`/books`)
    })
  })

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql',
})

conn.connect(function(err) {
    if(err){
        console.log(err)
    }

    console.log('Conectou ao mysql')

    app.listen(3000)
})
import express from "express"
import mysql from "mysql2"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())


const db = mysql.createConnection({
host:"localhost",
user: "root",
password: "10041988yulia",
database:"test"
})

app.get("/", (req, res)=>{
  res.json("Hello my friend")
})

app.get('/books', (req, res) => {
	const q = 'SELECT * FROM books'
	db.query(q, (err, data) => {
		if (err) {
			console.log(err)
			return res.json(err)
		}
		return res.json(data)
	})
})

app.post("/books", (req, res)=>{
  const q = "INSERT INTO books (`title`, `desc`, `cover`, `price`) VALUE (?)";
      const values = [
       req.body.title,
       req.body.desc,
       req.body.cover,
       req.body.price
      ];

      db.query(q, [values], (err, data)=>{
        if(err) return res.json(err);
        return res.json("books forever")
      })
})

app.delete("/books/:id", (req, res)=>{
  const bookId = req.params.id
  const q = "DELETE FROM books WHERE id = ?"

  db.query(q, [bookId], (err, data)=>
  {if(err) return res.json(err)
    return res.json("book delete")

  })
})

app.put('/books/:id', (req, res) => {
	const bookId = req.params.id
	const q =
		'UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?'

	const values = [req.body.title, req.body.desc, req.body.price, req.body.cover]

	db.query(q, [...values, bookId], (err, data) => {
		if (err) return res.send(err)
		return res.json(data)
	})
})




app.listen(8800, ()=>{ console.log('Connect to backend1')
  
})
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./database_connection')
const bcrypt = require('bcrypt')

const app = express()
app.use(cors())
app.use(bodyParser())

app.get('/', (req, res) => {
})

app.get('/item/random', (req, res) => {
    db.getRandomItem()
        .then(id => {
            db.findItemByDbId(id)
                .then(item => res.send(item))
        })
})

app.get('/item/:id', (req, res) => {
    db.findItemById(req.params.id)
        .then(object => res.send(object))
})

app.post('/register', (req, res) => { //params name, username, and password
db.isUsernameAvailable(req.body.username)
    .then(list => {
        if (list.length > 0){
            res.json('Username Unavailable')
        } else {
            bcrypt.hash(req.body.password, 10, (error, hash) => {
                db.addUser(req.body.name, req.body.username, hash)
                .then(id => console.log(`User created with id of ${id}`))
            })
            res.json(`Congrats ${req.body.name}, you sucessfully made an account with username: ${req.body.username}`)
        }
    })
})

app.delete('/delete', (req, req) => {
    
})

app.post('/login', (req, res) => { //params username and password
    db.login(req.body.username)
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (error, success) => {
                    if (success){
                        db.getUserItems(req.body.username)
                            .then(items => res.send(items))
                    } else {
                        res.json('failure')
                    }
                })
            } else {
                res.json('no user with that username found')
            }
        })
})

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

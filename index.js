const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser())

app.get('/', (req, res) => {
    res.send('working')
})

app.post('/', (req, res) => {
    res.send(`${req.body.name} was posted`)
})

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

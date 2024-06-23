const express = require('express')
const app = express()
const PORT = process.env.PORT || 5001


//* REQUIRE ROUTES 
const reportRouter = require('./routes/report.router')

app.use(express.json())
app.use(express.static('build'))

app.use('/api/report', reportRouter)

app.listen(PORT, ()=>{
    console.log(`Listening on port: ${PORT}`)
})
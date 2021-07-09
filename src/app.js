const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static dir to server
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Davis'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Davis',
        image: '/img/pedro.png'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        help: 'this is a help',
        name: 'Davis'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'address must be provided'
        })
    }
    geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
        if (error) {
            return res.send({
                error: "address not found"
            })
        }
        forecast(latitude, longtitude, (error, fcData) => {
            if (error) {
                return res.send({
                    error: "no data for " + req.query.address
                })
            }
            console.log(location)
            console.log(fcData)
            res.send({
                address: req.query.address,
                forcast: fcData,
                location: location
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'must provider search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('not-found', {
        title: '404',
        error: 'Help article not found.',
        name: 'Davis'
    })
})

app.get('*', (req, res) => {
    res.render('not-found', {
        title: '404',
        error: 'Page not found.',
        name: 'Davis'
    })
})

app.listen(port, () => {
    console.log('server is up on ' + port)
})
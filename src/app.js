const request = require('request');
const path = require('path')
const express = require('express')
const exp = require('constants')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
//  const publicDirPath = path.join(__dirname, '../public')
// app.use(express.static(publicDirPath))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templetes/views'));
const partialsPath = path.join(__dirname, '../templetes/partials')
app.use(express.static('public'))
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name:  'Rajvi Navlakha'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Rajvi Navlakha'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Rajvi Navlakha',
        description: 'This is some helpful text.' 
    })
})


app.get('/weather', (req, res) => {
    const city = req.query.address
    if(!city) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    geocode(city, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error ,forecastData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: city
            })
        })
    })
})



// app.get('/products', (req, res) => {
    // if(!req.query.search) {
    //     return res.send({
    //         error: 'You provide must a search term'
    //     })
    // }

//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Rajvi Navlakha',
        text: 'Help article not found'

    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Rajvi Navlakha',
        text: 'Page not found!'
    })
})


app.listen(3000, () => {
    console.log('Serever is up on port 3000.')
})
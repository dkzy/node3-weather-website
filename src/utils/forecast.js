const { url } = require('inspector')
const request = require('request')

const forecast = (lantitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1152a74acc5362c612a0fe6a4d7e5f70&query=' + longtitude + ',' + lantitude + '&units=f'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service')
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            const current = body.current
            callback(undefined, current.weather_descriptions[0] + '. It is currently ' + current.temperature + ' degrees out and it feels like ' + current.feelslike + ' degrees.')
        }
    })
}

module.exports = forecast

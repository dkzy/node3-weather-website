const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=1&access_token=pk.eyJ1IjoiZnJvbnQ5OTkiLCJhIjoiY2txOGE1ZmxyMGUzbTJvbG1sdjVsZ3VpdyJ9.CzD7bQcPd0BZcRVoA7WL7w'
    request({ url, json: true }, (error, { body:{features} } = {}) => {
        if (error) {
            callback('Unable to connect to location service')
        } else if (!features || features.length == 0) {
            callback('location not match')
        } else {
            callback(undefined, {
                latitude: features[0].center[0],
                longtitude: features[0].center[1],
                location: features[0].place_name,
            })
        }
    })
}

module.exports = geocode
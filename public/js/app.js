const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log(location)

    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''

    url = 'http://localhost:3000/weather?address=' + location
    fetch(url).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        } else {
            console.log(data.forcast)
            console.log(data.location)
            messageOne.textContent = data.forcast
            messageTwo.textContent = data.location
        }
    })
})
})
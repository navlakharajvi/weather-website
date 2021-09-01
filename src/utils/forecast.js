const request = require('request')

// const forecast = (city, callback) => {
//     // const url = 'https://api.openweathermap.org/data/2.5/find?'+latitude + longitude +'cnt=10&units=metric&appid=6233d7e5e0ea74ad6f45e97ad6498195';
//    url = 'https://api.openweathermap.org/data/2.5/weather?q=Ahmedabad&units=metric&apikey=6233d7e5e0ea74ad6f45e97ad6498195';
//     request({url: url, json: true}, (error, response) => {
        
//         // if(error) {
//         //     callback('Unable to connect to location services!', undefined) 
//         //  }
//         // // console.log(response.body)
//         //   else if(response.body.error) {
              
//         //      callback('Unable to find location!. Try another search.', undefined)
//         //  }
        
//         console.log("It is currently "+ response.body.main.temp+ " dregees out. "+ "\nToday's weather is "+response.body.weather[0].main+"y."+"\nThere are chances of "+response.body.weather[0].description)
//         //  else {
//             // callback(undefined, "It is currently "+ response.body.main.temp+ " dregees out. "+ "\nToday's weather is "+response.body.weather[0].main+"y."+"\nThere are chances of "+response.body.weather[0].description) 
//         //  }
//     })
// }

const forecast = (latitude, longitude, callback) => {
     const url = 'https://api.openweathermap.org/data/2.5/weather?&lat='+latitude+'&lon='+longitude+'&units=metric&appid=6233d7e5e0ea74ad6f45e97ad6498195';
    // const url = 'https://api.openweathermap.org/data/2.5/weather?q=Ahmedabad&units=metric&apikey=6233d7e5e0ea74ad6f45e97ad6498195';
    request({url, json: true}, (error, { body }) => {
         //console.log(response.body.error)
        if(error) {
            callback('Unable to connect to location services!', undefined) 
        }

        else if(body.error) {
            callback('Unable to find location!. Try another search.', undefined)
        }

        else {
            callback(undefined,"It is currently "+ body.main.temp+ " dregees out. "+ "\nToday's weather is "+body.weather[0].main+"\nThere is "+body.weather[0].description) 
        }
    })
}



// forecast(-75.7088, 44.1545, (error, data) => {
//     console.log('Error!', error)
//     console.log('Data', data)
// })



module.exports = forecast
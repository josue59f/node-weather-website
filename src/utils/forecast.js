const request = require("request");

const forecast = (latitude, longitude, callback) => {

  const url =
    "http://api.weatherstack.com/current?access_key=0227b9264dabf47dc8a8773f1d516321&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude) +
    "&units=f";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.error) {
      callback("unable to find location. try another search ", undefined);
    } else {
      callback(undefined, 
          (
          body.current.weather_descriptions[0] +
            ": it is currently " +
            body.current.temperature +
            " degrees out. It feels like it is " +
            body.current.feelslike

        )
      );
    }
  });
};
module.exports = forecast;

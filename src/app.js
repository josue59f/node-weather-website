const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT||3000

//define paths for express configuration
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars, engine, and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "josue fernandez",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "josue fernandez",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "josue fernandez",
  });
});

app.get("/weather", (req, res) => {
  
  if (!req.query.address) {
    
    return res.send({
      error: "You must provide a search term"
    });
  }
  geocode(
    req.query.address,(error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      console.log(latitude)
      console.log(longitude)

      forecast(latitude, longitude, (error, forecastdata) => {
        if (error) {
          return console.log(error);  
        }
        console.log
        res.send({
          location,
          forecastdata,
          address: req.query.address
        });
        
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: " 404",
    name: "josue fernandez",
    errormessage: "could not find help article",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: " 404",
    name: "josue fernandez",
    errormessage: "could not find page",
  });
});

app.listen(port, () => {
  console.log("server is up on port" + port);
});

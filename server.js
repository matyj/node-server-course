const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
const port = process.env.PORT || 3000;

const app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
app.set("view engine", "hbs");

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  console.log();
  fs.appendFile("server.log", log + "\n", err => {});
  next();
});

app.use((req, res, next) => {
  res.render("maintenance.hbs");
});

app.use(express.static(`${__dirname}/public`));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  // res.send("<h1>Hello express!</h1>");
  res.render("home.hbs", {
    welcomeMessage: "Welcome message",
    pageTitle: "Home Page"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Does not work!"
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
app.set("view engine", "ejs");

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

//app.get defines a route handler for Get requests to a given URL.

//   "/" path
// 

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/set", (req, res) => {
  const a = 1;
  res.send(`a = ${a}`);
 });
 
 app.get("/fetch", (req, res) => {
  res.send(`a = ${a}`);
 });

 app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

 app.get("/urls", (req, res) => {
   const templateVars = { urls: urlDatabase };
   res.render("urls_index", templateVars);
 });

//adding a route used to render this new template
 app.get("/urls/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  console.log(longURL);
  const templateVars = { 
    shortURL: req.params.shortURL, 
    longURL: longURL
  };
  res.render("urls_show", templateVars);
});

app.post("/urls", (req, res) => {
  console.log(req.body);  // Log the POST request body to the console
  //res.send("Ok");         // Respond with 'Ok' (we will replace this)
  const shortUrl = generateRandomString();
  urlDatabase[shortUrl] = req.body.longURL;
  //recieve the user input and save to database object
  res.redirect(`/urls/${shortUrl}`);
});


function generateRandomString() {
  return (Math.random().toString(36).slice(2)).slice(0,7);
}

app.get("/u/:shortURL", (req, res) => {
  const longURL = "/u/:shortURL";
  res.redirect(longURL);
});

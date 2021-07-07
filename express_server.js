const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 8080; // default port 8080
app.set("view engine", "ejs");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.use(cookieParser());


//   "/" path
// 

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});


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
  const username = req.cookies.username;
  if (req.cookies.username !== 'undefined') {
    console.log("cookie value", username);
  }
   const templateVars = { 
     urls: urlDatabase,
     username
    };
   res.render("urls_new", templateVars); 
});

 app.get("/urls", (req, res) => {
  const username = req.cookies.username;
  if (req.cookies.username !== 'undefined') {
    console.log("cookie value", username);
  }
   const templateVars = { 
     urls: urlDatabase,
     username
    };
   res.render("urls_index", templateVars);
 });

//adding a route used to render this new template
 app.get("/urls/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  console.log(longURL);
  const username = req.cookies.username;
  if (req.cookies.username !== 'undefined') {
    console.log("cookie value", username);
  }

  const templateVars = { 
    shortURL: req.params.shortURL, 
    longURL: urlDatabase[req.params.shortURL],
    username
  };
  console.log(urlDatabase);
  res.render("urls_show", templateVars);
});

app.post("/urls", (req, res) => {
  console.log(req.body);  // Log the POST request body to the console
  const shortUrl = generateRandomString();
  urlDatabase[shortUrl] = req.body.longURL;
  //recieve the user input and save to database object
  res.redirect(`/urls/${shortUrl}`);
});

function generateRandomString() {
  return (Math.random().toString(36).slice(2)).slice(0,7);
}

app.get("/u/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  const longURL = urlDatabase[shortURL];
  console.log(shortURL);
  res.redirect(longURL);
});

app.post("/urls/:shortURL/delete", (req, res) => {
  const shortURL = req.params.shortURL;
  const longURL = urlDatabase[shortURL];
  delete urlDatabase[shortURL]; 
  delete longURL; 
  res.redirect("/urls");
})

app.post("/urls/:id", (req, res) => {
  console.log("this is req.body.newURL", req.body.newURL);
  console.log("this is req.params.id", req.params.id);
  urlDatabase[req.params.id] = req.body.newURL;
  res.redirect("/urls");
})


app.get("/login", (req, res) => {
  const login = req.body.username;
  res.send(login);
})

app.post("/login", (req, res) => {
  //console.log("this is the inputted username", req.body.username);
  const username = req.body.username;
  
  res.cookie('username', username);
  console.log("req.cookies", req.cookies)
  res.redirect(`/urls`);
})
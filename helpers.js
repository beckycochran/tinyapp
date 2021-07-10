
const getUserByEmail = function(email, users) {
  const values = Object.values(users);
  for (const user of values) {
    if (user.email === email) {
      return user;
    }
  } return null;
}


const generateRandomString = function(length) {
  return (Math.random().toString(36).slice(2)).slice(0,(length -1));
}


const urlsForUser = function(id, urlDatabase) {
  const userUrls = {};
  
  for (const url in urlDatabase) {
    if (urlDatabase[url].userID === id) {
      userUrls[url] = urlDatabase[url];
    }
  } return userUrls;
}








module.exports = { getUserByEmail, generateRandomString, urlsForUser };
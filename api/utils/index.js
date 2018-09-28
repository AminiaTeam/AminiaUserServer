const lengthBetween = (min,max) => (word) => word.length >= min && word.length < max
const between4and15 = lengthBetween(4,15);
const between7and15 = lengthBetween(7,15);
const testRegex = (regex) => (word) => regex.test(word);
const isAlphanumeric = testRegex(/^[a-z0-9\&\_\.]+$/i)
const usernameValidation = user => between4and15(user) && isAlphanumeric(user)
const passwordValidation = pass => between7and15(pass) && isAlphanumeric(pass)

module.exports = {
  usernameValidation,
  passwordValidation
}

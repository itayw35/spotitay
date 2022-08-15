const userController = require("../DL/controllers/userController");
const jwtfb = require("../middleware/jwt");
async function register(user) {
  const { fname, lname, gender, email, password } = user;
  if (!fname || !lname || !email || !password) {
    throw { code: 400, message: "missing details" };
  }
  const myUser = await userController.read({ email: email });
  if (myUser.length > 0) {
    throw { code: 400, message: "user already exists" };
  } else {
    const newUser = await userController.create({
      fname: fname,
      lname: lname,
      gender: gender,
      email: email,
      password: password,
    });
    const token = jwtfb.createToken(newUser._id);
    return { token: token, userName: newUser.fname };
  }
}
async function login(user) {
  const { email, password } = user;
  const myUser = await userController.read({ email: email }, "+password");
  if (myUser.length < 1)
    throw { code: 400, message: "username or password is not correct" };
  if (myUser[0].password !== password)
    throw { code: 400, message: "username or password is not correct" };
  const token = jwtfb.createToken(myUser[0]._id);
  return { token: token, userName: myUser[0].fname };
}

module.exports = { register, login };

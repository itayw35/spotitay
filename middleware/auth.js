const jwt = require("jsonwebtoken");
const jwtAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, verifyToken) => {
      if (err) {
        res.status(403);
      }
      req._id = verifyToken._id;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
module.exports = jwtAuth;

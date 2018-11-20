const jwt = require("jsonwebtoken");
const redis = require("redis");

// Setup redis
const redisClient = redis.createClient(process.env.REDIS_URI);

const handleSignin = (db, bcrypt, req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject("incorrect form submission");
  }
  return db
    .select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then(user => user[0])
          .catch(err => Promise.reject("unable to get user"));
      } else {
        Promise.reject("wrong credentials");
      }
    })
    .catch(err => Promise.reject("wrong credentials"));
};
const getAuthTokenId = () => {
  console.log("Auth OK");
};
const signToken = email => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, "JWT_Secret", { expiresIn: "2 days" });
};
const createSession = user => {
  // Create JWT Token, return user
  const { email, id } = user;
  const token = signToken(email);
  return { success: "true", userId: id, token };
};
const signinAuthentication = (db, bcrypt) => (req, res) => {
  const { authorization } = req.headers;
  return authorization
    ? getAuthTokenId()
    : handleSignin(db, bcrypt, req, res)
        .then(user => {
          return user.id && user.email
            ? createSession(user)
            : Promise.reject("Unable to get user");
        })
        .then(session => res.json(session))
        .catch(err => res.status(400).json(err));
};
module.exports = {
  handleSignin,
  signinAuthentication
};

const jwt = require("jsonwebtoken");

const verifyToken = async (req, res) => {
  if (req.headers.authorization)
    return res.status(403).json({ message: "not auithorized" });

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    const token = req.headers.authorization.split("")[1];
    jwt.verify(token, process.env.SECRET, (err, data) => {
      if (err)
        return res.status(403).json({ message: "wrong or expired token" });
    else{   
        req.user = data 
        next()
    }
    });
  }
};


module.exports = verifyToken
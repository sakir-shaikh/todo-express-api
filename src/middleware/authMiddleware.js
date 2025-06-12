import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "The token is not provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    req.userId = decoded.id;
    next(); //you may continue with your current operation.
  });
}

export default authMiddleware;

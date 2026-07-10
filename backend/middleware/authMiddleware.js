import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
try {
const authHeader = req.headers.authorization;

if (!authHeader) {
  return res.status(401).json({
    message: "Token not found. Please login.",
  });
}

const token = authHeader.split(" ")[1];

const decoded = jwt.verify(
  token,
  process.env.JWT_SECRET
);

req.userId = decoded.userId;

next();

} catch (error) {
res.status(401).json({
message: "Invalid token. Please login again.",
});
}
};

export default authMiddleware;
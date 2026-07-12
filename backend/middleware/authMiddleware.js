// import jwt from "jsonwebtoken";

// const authMiddleware = (req, res, next) => {
// console.log(req.headers.authorization);
// console.log(req.userId);


//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//       return res.status(401).json({
//         message: "Token not found. Please login.",
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET
//     );

//     req.userId = decoded.userId;

//     next();

//   } catch (error) {
//     res.status(401).json({
//       message: "Invalid token. Please login again.",
//     });
//   }
// };

// export default authMiddleware;

import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Token not found. Please login.",
      });
    }

    console.log("Authorization:", authHeader);

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.userId = decoded.userId;

    console.log("Decoded:", decoded);
    console.log("User ID:", req.userId);

    next();

  } catch (error) {
    console.error(error);

    return res.status(401).json({
      message: "Invalid token. Please login again.",
    });
  }
};

export default authMiddleware;
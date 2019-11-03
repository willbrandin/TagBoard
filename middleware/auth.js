const { User } = require("../models"),
  jwt = require("jsonwebtoken");

// Does the user have a token
exports.isAuthorized = async (request, response, next) => {
  let token = getToken(request);

  if (!token) {
    console.log("No token found");
    return response.status(403).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded && decoded.id) {
      const user = await User.findById(decoded.id);
      request.user = user;
      return next();
    } else {
      return response.status(403).json({ error: "Unauthorized" });
    }
  } catch (error) {
    return response.status(403).json({ error: "Unauthorized" });
  }
};

// Can this person view the data they are trying to access?
exports.isAuthenticated = (request, response, next) => {
  return request.user.id == request.params.userId
    ? next()
    : response.status(403).json({ error: "Unauthorized" });
};

const getToken = request => {
  let authorization = request.headers.authorization;
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.split("Bearer ")[1];
  }
};

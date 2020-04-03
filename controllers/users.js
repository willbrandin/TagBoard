const { User } = require("../models"),
  jwt = require("jsonwebtoken");

exports.signIn = async (request, response) => {
  if (!request.body.userCredential) {
    response.status(403).json({ message: "No user credential" });
    return;
  }

  try {
    const user = await User.findOne({
      userCredential: request.body.userCredential
    }).exec();

    if (user !== null) {
      return signIn(user, request, response);
    } else {
      return createUser(request, response);
    }
  } catch (error) {
    return response.status(500).json(error);
  }
};

exports.getUser = (request, response) => {
  return response.status(200).json(request.user);
};

const createUser = async (request, response) => {
  let newUser = new User({
    email: request.body.email,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    userCredential: request.body.userCredential
  });

  try {
    const user = await newUser.save();
    const { id } = user;
    const token = jwt.sign({ id }, process.env.SECRET_KEY);
    return response.status(201).json({ user, token });
  } catch (error) {
    return response.status(500).json(error);
  }
};

const signIn = (user, request, response) => {
  const { id } = user;
  let token = jwt.sign({ id }, process.env.SECRET_KEY);
  return response.status(200).json({ user: user, token });
};

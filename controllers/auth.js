const User = require("../models/user.js");
const bcrypt = require("bcrypt");

// GET "/auth/register"
const register = (req, res) => {
  res.render("auth/register.ejs", {
    errorMessage: null,
    formData: {},
  });
};

// POST "/auth/register"
const registerUser = async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;

    // Check if username exists
    const userInDatabase = await User.findOne({ username });
    if (userInDatabase) {
      return res.render("auth/register.ejs", {
        errorMessage: "Username already taken.",
        formData: req.body,
      });
    }

    // Check password match
    if (password !== confirmPassword) {
      return res.render("auth/register.ejs", {
        errorMessage: "Password and Confirm Password must match.",
        formData: req.body,
      });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create user
    const user = await User.create({
      username,
      password: hashedPassword,
    });

    // Start session
    req.session.user = {
      username: user.username,
      _id: user._id,
    };

    req.session.save(() => {
      res.redirect("/");
    });

  } catch (err) {
    // Handle mongoose validation errors (if you add required fields later)
    if (err.name === "ValidationError") {
      res.render("auth/register.ejs", {
        errorMessage: "Username already in use",
        formData: req.body,
      });
    } else {
      res.status(500).send(err.message);
    }
  }
};

// GET "/auth/login"
const login = (req, res) => {
  res.render("auth/login.ejs");
};

// POST "/auth/login"
const loginUser = async (req, res) => {
  // Make sure username is not already taken
  const userInDatabase = await User.findOne({ username: req.body.username });

  if (!userInDatabase) {
    return res.send("Login failed. Please try again");
  }

  // Compare userInDatabase's hashed password against Form Data password hashed by bcrypt
  const validPassword = bcrypt.compareSync(
    req.body.password,
    userInDatabase.password
  );

  if (!validPassword) {
    return res.send("Login failed. Please try again.");
  }

  // Manage Session
  req.session.user = {
    username: userInDatabase.username,
    _id: userInDatabase._id,
  };

  req.session.save(() => {
    res.redirect("/");
  });
};

// GET "/auth/sign-out"
const signOut = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

module.exports = {
  register,
  registerUser,
  login,
  loginUser,
  signOut,
};
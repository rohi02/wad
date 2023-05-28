const User = require("../models/userModel");

const getAllusers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch users" });
  }
};

const getOneuser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch user" });
  }
};
const Createuser = async (req, res) => {
  console.log(req.body);
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res.send({ error: "User exists" });
  }
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    await newUser.save();
    return res.status(500).json(newUser._doc);
  } catch (err) {
    return res.status(500).json("Error saving user");
  }
};
const Updateuser = async (req, res) => {
  const userId = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(updatedUser);
  } catch (error) {
    res.status(500).send({ error: "Failed to update user" });
  }
};

const Deleteuser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(deletedUser);
  } catch (error) {
    res.status(500).send({ error: "Failed to delete user" });
  }
};

module.exports = {
  getAllusers,
  getOneuser,
  Createuser,
  Updateuser,
  Deleteuser,
};

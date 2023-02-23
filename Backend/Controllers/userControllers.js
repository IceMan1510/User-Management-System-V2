const validator = require("validator");
const {
  getAllUsersService,
  getSingleUserService,
  deleteUserService,
  updateUserService,
} = require("../Services/userServices");

let checkPwd = (str) => {
  if (
    str.length < 8 ||
    str.length > 500 ||
    str.search(/\d/) == -1 ||
    str.search(/[a-zA-Z]/) == -1 ||
    str.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:]/) != -1
  ) {
    return false;
  } else {
    return true;
  }
};
var validateContactNumber = (input) => {
  const regex = /^\d{10}$/; // regex pattern to match exactly 10 digits
  return regex.test(input);
};
var isZipNumber = (zip) => {
  if (isNaN(zip)) {
    return false;
  }

  if (zip.toString().length !== 6) {
    return false;
  }

  return true;
};

var checkDate = (date) => {
  if (
    new Date(date).getFullYear() < 1970 ||
    new Date(date).getFullYear() > 2005 ||
    date === "Select Date" ||
    date === ""
  ) {
    return false;
  } else {
    return true;
  }
};
var allValidForUpdate = (user) => {
  if (
    user.fName.trim() === "" ||
    !validator.isAlpha(user.lName) ||
    !validator.isAlpha(user.mName) ||
    user.lName.trim() === "" ||
    !validator.isEmail(user.email) ||
    !validator.isAlpha(user.fName) ||
    user.contact.trim() === "" ||
    user.contact.trim().length !== 10 ||
    user.address.trim() === "" ||
    user.dob.trim() === "" ||
    user.contact.trim() === "" ||
    !checkDate(user.dob) ||
    !validateContactNumber(user.contact) ||
    !isZipNumber(user.pinCode) ||
    user.address.trim() === "" ||
    user.address1.trim() === "" ||
    user.state === "Select State" ||
    user.city.trim() === "" ||
    user.landmark.trim() === ""
  ) {
    return true;
  } else {
    return false;
  }
};
var allValid = (user) => {
  if (
    user.fName.trim() === "" ||
    !validator.isAlpha(user.lName) ||
    !validator.isAlpha(user.mName) ||
    user.lName.trim() === "" ||
    !validator.isEmail(user.email) ||
    !validator.isAlpha(user.fName) ||
    user.contact.trim() === "" ||
    user.contact.trim().length !== 10 ||
    user.password.trim() === "" ||
    user.address.trim() === "" ||
    user.dob.trim() === "" ||
    user.contact.trim() === "" ||
    !checkPwd(user.password) ||
    !checkDate(user.dob) ||
    !validateContactNumber(user.contact) ||
    !isZipNumber(user.pinCode) ||
    user.address.trim() === "" ||
    user.address1.trim() === "" ||
    user.state === "Select State" ||
    user.city.trim() === "" ||
    user.landmark.trim() === ""
  ) {
    return true;
  } else {
    return false;
  }
};

exports.getUsers = async (req, res) => {
  try {
    const params = req.params;
    if (JSON.stringify(params) === "{}") {
      var page = req.query.page;
      var serviceResponse = await getAllUsersService(page);
      res.status(200).send(serviceResponse);
    } else {
      var serviceResponse = await getSingleUserService(params.id);
      if (serviceResponse.length === 0) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.status(200).send(serviceResponse);
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteUserService(id);
    if (result) {
      res
        .status(200)
        .send({ message: `User with ID ${id} deleted successfully` });
    } else {
      res.status(404).send({ error: `No user found with ID ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;
    const result = await updateUserService(id, body);
    if (!result) {
      return res.status(404).send({ error: `No user found with ID ${id}` });
    } else {
      return res.send({ message: `User with ID ${id} updated successfully` });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

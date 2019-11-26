const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const keys = require('./../../config/keys');

const adminSchema = mongoose.Schema({
  full_name: {
    type: String,
    trim: true,
    lowercase: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error(
          "Email is invalid, Please check the Email and try again"
        );
      }
    }
  },

  password: {
    type: String,
    trim: true,
    minLength: "3",
    required: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Please your password cannot contain "password"');
      }
    }
  },

  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

//methods to locate admin
adminSchema.statics.findByCredentials = async (email, password) => {
  const admin = await Admin.findOne({ email });

  if (!email === admin.email) {
    throw new Error("You are not Authorised");
  }

  //compare password
  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    throw new Error("Invalid Password");
  }

  return admin;
};

//methods to locate admin
adminSchema.statics.findEmail = async email => {
  const admin = await Admin.findOne({ email });

  return admin;
};

adminSchema.methods.generateAuthToken = async function() {
  const admin = this;
  const token = jwt.sign({ _id: admin._id.toString() }, keys.SECRET, {
    expiresIn: "1 week"
  });
  admin.tokens = admin.tokens.concat({ token });

  await admin.save();
  return token;
};

adminSchema.methods.toJSON = function() {
  const admin = this;
  const adminObject = admin.toObject();

  //Hide all data
  delete adminObject.tokens;
  delete adminObject.password;

  return adminObject;
};

adminSchema.pre("save", async function(next) {
  const admin = this;
  if (admin.isModified("password")) {
    admin.password = await bcrypt.hash(admin.password, 8);
  }
  next();
});

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;

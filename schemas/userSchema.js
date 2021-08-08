const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  //   first_name: {
  //     type: String,
  //     required: [true, "First name is required"],
  //   },
  //   last_name: {
  //     type: String,
  //     required: [true, "Last name is required"],
  //   },
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "Email is required"],
    validate: [validator.isEmail, "Email must be valid"],
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, "Password is required"],
    select: false,
  },
  password_confirm: {
    type: String,
    required: [true, "Password confirmation is required"],
    validate: {
      validator: function (_password) {
        return _password === this.password;
      },
      message: "Passwords must match",
    },
  },
  avatar: {
    type: mongoose.Schema.ObjectId,
    ref: "Avatar",
    required: true,
  },
  password_changed_at: Date,
  active: {
    type: Boolean,
    default: true,
  },
  custom_recipes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Recipe",
    },
  ],
  saved_recipes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Recipe",
    },
  ],
  following: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  preferences: [
    {
      type: String,
    },
  ],
  servings: {
    type: Number,
    required: true,
  },
});

// userSchema.methods.isPasswordCorrect = async function (input, hash) {
//   return await bcrypt.compare(input, hash);
// };

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.password_confirm = undefined;
  next();
});

// userSchema.pre(/^find/, function (next) {
//   this.find({ active: { $ne: false } });
//   next();
// });

// userSchema.methods.hasChangedPassword = function (JWTTS) {
//   if (this.password_changed_at) {
//     const changed_at = parseInt(this.password_changed_at.getTime() / 1000, 10);
//     return JWTTS < changed_at;
//   }
//   return false;
// };

// userSchema.pre("save", function (next) {
//   if (!this.isModified("password") || this.isNew) return next();
//   this.password_changed_at = Date.now() - 1000;
//   next();
// });

const User = mongoose.model("User", userSchema);

module.exports = User;

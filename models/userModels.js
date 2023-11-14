const mongooes = require("mongoose");
const bcrypt = require("bcrypt");
const schema = mongooes.Schema;
const userSchema = new schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: String,
  lastname: String,
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function(email, password){
  const user = this.findOne({ email: email });
  if(!user){
    throw Error('no user found')
  }

  const auth = bcrypt.compare(password, user.password)
  if(!auth){
    throw Error('invalid Password')
  }
  return user
}


module.exports = mongooes.model("users", userSchema);

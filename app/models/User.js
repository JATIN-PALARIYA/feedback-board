import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  username: { type: String, required: true },
  my: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feedback" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next();

  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  next();
});

// Method to compare password during login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

// Fix: prevent model re-compilation error
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;

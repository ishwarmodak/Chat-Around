const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: { type: String, default: "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg" },

}, {
    timestamps: true
});
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
userSchema.pre('save', async function (next) {
    if (!this.isModified) { next() }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})
const User = mongoose.model("User", userSchema);
module.exports = User;

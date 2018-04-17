const mongoose = require('mongoose')

const regexpForCheckEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
const messageSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'The email field is required'],
      validate: {
        validator: v => regexpForCheckEmail.test(v),
        message: 'E-mail is invalid',
      },
      trim: true,
    },
    text: {
      type: String,
      required: [true, 'The text field is required'],
      maxlength: [100, 'The text must be no longer than 100 characters'],
      trim: true,
    },
  },
  { timestamps: true, versionKey: false },
)

function wrapperFindById(messageId) {
  if (!mongoose.Types.ObjectId.isValid(messageId)) {
    return null
  }
  return this.findById(messageId)
}
messageSchema.statics.wrapperFindById = wrapperFindById

const Message = mongoose.model('message', messageSchema)

module.exports = Message

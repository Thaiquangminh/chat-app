import mongoose from 'mongoose'

const conversationSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: []
    }
  ]
  // timestamps = true so when created any message will automatically generate createdAt and updateAt field
}, { timestamps: true })

const Conversation = mongoose.model("Conversation", conversationSchema)

export default Conversation
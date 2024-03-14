import Conversation from '../models/conversation.model.js'
import Message from '../models/message.model.js'

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body
    const { receiverId } = req.params
    const senderId = req.user._id

    // 2 APPROACH 

    // 1. USING CREATE
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    })

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId]
      })
    }

    const newMessage = new Message({
      message,
      senderId,
      receiverId
    })

    if (newMessage) {
      conversation.messages.push(newMessage._id)
    }

    // await conversation.save()
    // await newMessage.save()

    // 2. USING "NEW"
    // const conversation = await Conversation.findOne({
    //   participants: { $all: [senderId, receiverId] }
    // })

    // if (!conversation) {
    //   const newConversation = await new Conversation({
    //     participants: [senderId, receiverId],
    //     messages: []
    //   })

    //   const newMessage = await new Message({
    //     message,
    //     senderId,
    //     receiverId
    //   })

    //   console.log(newConversation)

    //   if (newMessage) {
    //     newConversation.messages.push(newMessage._id)
    //   }

    //   await Promise.all([newConversation.save(), newMessage.save()])
    // }

    // const newMessage = await new Message({
    //   message,
    //   senderId,
    //   receiverId
    // })

    // if (newMessage) {
    //   conversation.messages.push(newMessage._id)
    // }

    // await conversation.save()
    // await newMessage.save()

    // Using promise.all to do 2 actions with the same time

    await Promise.all([conversation.save(), newMessage.save()])
    res.status(200).json({
      statusCode: 200,
      data: {
        senderId: senderId,
        receiverId: receiverId,
        message: newMessage.message
      }
    })

  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: 'Internal server error'
    })
  }
}

export const getMessage = async (req, res) => {
  try {
    const { receiverId } = req.params
    const senderId = req.user._id
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    }).populate('messages')

    if (!conversation) {
      res.status(200).json({
        statusCode: 200,
        data: {
          message: []
        }
      })
    }
    else {
      res.status(200).json({
        statusCode: 200,
        data: {
          messages: conversation.messages
        }
      })
    }

  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: 'Internal server error'
    })
  }
}
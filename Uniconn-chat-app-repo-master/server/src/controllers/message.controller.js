import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user.id;
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
      message: text,
      senderId,
      receiverId,
    });

    if (newMessage) {
      conversation.messages.push(newMessage);
      conversation.lastMessage = newMessage;
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    //socketIO functionality
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.warn("Error while sending the message");
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

//GETALLMESSAGES FROM SPECIFIC USERS
export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

    if (!conversation)
      return res.status(200).json({ message: "no messages found", data: [] });

    const messages = conversation.messages;

    return res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    return res.status(500).json(error);
  }
};

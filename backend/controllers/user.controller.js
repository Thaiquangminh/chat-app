import User from "../models/user.modal.js"

export const getUsers = async (req, res) => {
  try {
    const loggedIdUser = req.user._id

    const allUsers = await User.find({
      // Except logged in account
      _id: { $ne: loggedIdUser }
    }).select("-password")

    res.status(200).json({
      statusCode: 200,
      data: {
        users: allUsers
      }
    })


  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Internal server error"
    })
  }
}
import jwt from "jsonwebtoken"
import User from '../models/user.modal.js'

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.access_token
    // Check token
    if (!token) {
      return res.status(401).json({
        statusCode: 401,
        message: 'Unauthorized'
      })
    }

    // Check user id from token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (!decoded) {
      return res.status(401).json({
        statusCode: 401,
        message: 'Unauthorized - Invalid Token'
      })
    }

    // Check user from user id
    const user = await User.findById(decoded.userId)

    if (!user) {
      return res.status(401).json({
        statusCode: 401,
        message: 'Invalid user'
      })
    }

    // Pass all check
    req.user = user
    next()

  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: 'Internal server error'
    })
  }
}

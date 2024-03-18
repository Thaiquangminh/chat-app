import bcrypt from 'bcryptjs'
import User from '../models/user.modal.js'
import generateTokenAndSetCookie from '../utils/generateToken.js'

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body
    // Check password
    if (password !== confirmPassword) {
      res.status(400).json({ message: "Password don't match" })
    }

    const user = await User.findOne({ username: username })
    // Check unique username
    if (user) {
      res.status(400).json({ message: "Username already existed" })
    }
    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    // Profile image
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser = new User({
      fullName,
      username,
      password: hashPassword,
      gender,
      profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
    })
    if (newUser) {
      // await generateTokenAndSetCookie(newUser._id, res)
      await newUser.save()

      res.status(200).json({
        statusCode: 200,
        message: "Signup successfully",
        data: {
          _id: newUser._id,
          fullName: newUser.fullName,
          username: newUser.username,
          profilePic: newUser.profilePic
        }
      })
    }
    else {
      res.status(400).json({
        statusCode: 400,
        message: "Invalid user"
      })
    }

  }
  catch (error) {
    console.log("Error while signup", error.message)
    res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error'
    })
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username: username })

    const isPasswordCorrect = bcrypt.compareSync(password, user.password || '')
    if (!user || !isPasswordCorrect) {
      res.status(400).json({
        statusCode: 400,
        message: "Invalid username or password"
      })
    }
    else {
      generateTokenAndSetCookie(user._id, res)
      res.status(200).json({
        statusCode: 200,
        message: "Login successfully",
        data: {
          _id: user._id,
          fullName: user.fullName,
          username: user.username,
          profilePic: user.profilePic
        }
      })
    }

  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error'
    })
  }
}

export const logout = (req, res) => {
  try {
    res.cookie('access_token', '', {
      maxAge: 0
    })
    res.status(200).json({
      statusCode: 200,
      message: "Logout successfully"
    })
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error'
    })
  }
}

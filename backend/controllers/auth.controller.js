import bcrypt from 'bcryptjs'
import User from '../models/user.modal.js'
import generateTokenAndSetCookie from '../utils/generateToken.js'

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body
    // Check password
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password don't match" })
    }

    const user = await User.findOne({ username })
    // Check unique username
    if (user) {
      return res.status(400).json({ error: "Username already existed" })
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
      await generateTokenAndSetCookie(newUser._id, res)
      await newUser.save()

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic
      })
    }
    else {
      res.status(400).json({
        error: 'Invalid user'
      })
    }

  }
  catch (error) {
    console.log("Error while signup", error.message)
    res.status(500).json({
      error: 'Internal Server Error'
    })
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = User.findOne({ username })

    const isPasswordCorrect = bcrypt.compareSync(password, user.password || '')
    if (!user || !isPasswordCorrect) {
      res.status(400).json({
        error: "Invalid username or password"
      })
    }

    generateTokenAndSetCookie(user._id, res)

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic
    })

  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error'
    })
  }
}

export const logout = (req, res) => {
  console.log("Logout")
  res.send('Logout')
}

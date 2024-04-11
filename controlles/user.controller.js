import { User } from "../models/userModels.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export class UserController {

    static register = async(req, res) => {
        try {
            const { name, email, password } = req.body;
            const user = await User.findOne({ email });
            console.log("user register", user)
            if(user) return res.status(400).json({ message: 'This email already exists' });
            if(password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters long' });
           
            const passwordHash = await bcrypt.hash(password, 10);
            //return res.json({password, passwordHash})
            const newUser = new User({
                name,
                email,
                password: passwordHash
            })
            await newUser.save()
            const accessToken = createAccessToken({id: newUser._id})
            const refreshToken = createRefreshToken({id: newUser._id})
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/api/user/refresh_token'
            })

            return res.status(200).json({ message: 'register success', accessToken }); 
        } catch (error) {
            console.log("error register", error)
            return res.status(500).json({ message: error.message });
        }
    }

    static login = async(req, res) => {
        try {
            const { email, password } = req.body;
            //verifico que exista
            const user = await User.findOne({ email });
            console.log('user loguin', user)
            if(!user) return res.status(400).json({ message: 'User doe not exist' });
            //si existe comparo la contraseña
            const isMatch = await bcrypt.compare(password, user.password);
            console.log('isMatch', isMatch)
            if(!isMatch) return res.status(400).json({ message: 'Incorrect password' });

            const accessToken = createAccessToken({id: user._id})
            console.log('accessToken', accessToken)
            const refreshToken = createRefreshToken({id: user._id})
            console.log('refreshToken', refreshToken)
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/api/user/refresh_token'
            })
            return res.status(200).json({message: 'Login success', accessToken });
        } catch (error) {
            console.log("error login", error)
            return res.status(500).json({ message: error.message });
        }
    }

    static logout = async(req, res) => {
        try {
            const logout = res.clearCookie('refreshToken', { path: '/api/user/refresh_token' });
            console.log('logout', logout)
            return res.status(200).json({message: 'Logged out'})
        } catch (error) {
            console.log("error logout", error)
            return res.status(500).json({ message: error.message });
        }
    }

    static refreshToken = async(req, res) => {

        try {
            const rf_token = req.cookies.refreshToken
            console.log('rf_token', rf_token)
            if(!rf_token) return res.status(400).json({message: 'Please login or register'})
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) return res.status(400).json({message: 'Login or register now'})
                const accessToken = createAccessToken({id: user.id})
                return res.json({accessToken})
            })          
        } catch (error) {
            console.log("error refreshToken", error)
            return res.status(500).json({ message: error.message });
        }

    }

    static getUser = async(req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password')
            console.log('user get', user)
            if(!user) return res.status(400).json({message: 'User does not exist'})
            return res.status(200).json({user})
        } catch (error) {
            console.log("error getUser", error)
            return res.status(500).json({ message: error.message });
        }
    }
}

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d'})
        
}

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d'})
}



import jwt from 'jsonwebtoken'

export const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization')
        console.log('Token Auth', token)
        if(!token) return res.status(400).json({ msg: 'Invalid Authentication 1.' })
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            console.log('User verif',user, err, 'token pos', token)
            if(err) return res.status(400).json({ msg: 'Invalid Authentication 2.' })
            req.user = user
            next()
        })

    } catch (error) {
        console.log('error auth', error)
        return res.status(500).json({ msg: error.message }) 
    }

}
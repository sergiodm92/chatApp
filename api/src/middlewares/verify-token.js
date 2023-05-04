const jwt = require('jsonwebtoken')
const tokenSecret = process.env.TOKEN_SECRET


const verifyToken = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
        const verified = jwt.verify(token, tokenSecret)
        req.user = verified
        next()
    } catch (error) {
        return res.status(400).json({error: 'El token no es válido'});
    }
}

module.exports = verifyToken;
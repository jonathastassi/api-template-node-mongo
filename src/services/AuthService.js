const jwt = require('jsonwebtoken');

module.exports = function(app) {

    this.generateToken = async (data) => {
        return jwt.sign(data, process.env.JWT_KEY, { expiresIn: '1d' });
    }

    this.decodeToken = async (token) => {
        let data = await jwt.verify(token, process.env.JWT_KEY);
        return data;
    }

    this.getToken = (req) => {
        let token = req.body.token || 
                    req.query.token || 
                    req.headers['x-access-token'] || 
                    req.headers['Authorization'] ||
                    (req.headers.authorization ? req.headers.authorization.split(" ")[1] : null);

        return token;
    }

    this.authorize = (req, res, next) => {
        let token = this.getToken(req);

        if (!token) {
            res.status(401).json({
                message: 'Acesso restrito'
            });
        } else {
            jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
                if (err) {
                    res.status(401).json({
                        message: 'Não autorizado'
                    });
                } else {
                    next();
                }
            })
        }
    }

    this.isAdmin = (req, res, next) => {
        let token = this.getToken(req);

        if (!token) {
            res.status(401).json({
                message: 'Acesso Restrito'
            });
        } else {
            jwt.verify(token, global.SALT_KEY, (err, decoded) => {
                if (err) {
                    res.status(401).json({
                        message: 'Não autorizado'
                    });
                } else {
                    if (decoded.roles.includes('admin')) {
                        next();
                    }
                    else {
                        res.status(401).json({
                            message: 'Não autorizado'
                        })
                    }
                }
            })
        }
    }

    return this;  
};
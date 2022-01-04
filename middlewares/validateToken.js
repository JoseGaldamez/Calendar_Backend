const { response } = require("express");
const jsonwebtoken = require("jsonwebtoken");


const validateToken = ( req, res = response, next ) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "Token is required"
        });
    }


    try {
        

        const {uid, name} = jsonwebtoken.verify(token, process.env.SECRET_TOKEN_SEED);

        req.uid = uid;
        req.name = name;


    } catch (error) {


        return res.status(401).json({
            ok: false,
            msg: "Invalid token"
        })
    }

    next();
}

module.exports = validateToken;
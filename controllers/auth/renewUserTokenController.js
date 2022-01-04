const { response } = require("express");
const generateJWT = require("../../helpers/jwt");

const renewUserTokenController = async ( req, res = response ) => {


    const {uid, name} = req;

    const token = await generateJWT(uid, name);

    res.json({
        msg: "OK RENEW",
        token
    })

}

module.exports = renewUserTokenController;
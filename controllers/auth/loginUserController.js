const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const UserModel = require("../../models/UserModel");
const generateJWT = require("../../helpers/jwt");


const loginUserController = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {
        
        // checking if email already exists
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "Email or password incorrect"
            });
        }
        
        const validPassword = bcrypt.compareSync( password, user.password );
        
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Password incorrect"
            });
        }

        // Generate TOKEN

        const token = await generateJWT(user.id, user.name);


        res.status(200).json({
            ok: true,
            email: user.email,
            uid: user.id,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Something went wrong, call to admins"
        });
    }
}

module.exports = loginUserController;
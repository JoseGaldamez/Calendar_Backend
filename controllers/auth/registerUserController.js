const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const UserModel = require("../../models/UserModel");
const generateJWT = require("../../helpers/jwt");

const registerUserController = async (req = request , res=response) => {

    const { email } = req.body;
    
    try {
        
        // checking if email already exists
        let user = await UserModel.findOne({ email })
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: "Email already exists."
            });
        }
        
        
        // creating a user from information request contains
        user = UserModel(req.body)
        
        // Encripting Password
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync( user.password, salt );

        // saving user and getting info
        const newUser = await user.save();

        const token = await generateJWT(newUser.id, newUser.name);

        return res.status(201).json({
            msg: "Ok Register",
            email: newUser.email,
            uid: newUser._id,
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

module.exports = registerUserController;
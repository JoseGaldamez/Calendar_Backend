const {Router} = require("express");
const { check } = require("express-validator");

// middlewares
const validateFields = require("../middlewares/validateFields");


// controllers
const {
    registerUserController,
    loginUserController,
    renewUserTokenController
} = require("../controllers/auth");
const validateToken = require("../middlewares/validateToken");
const router = Router();




// Router of Auth
// host + /api/auth


// Register a new user
router.post( '/register',
            [ // Middleware
                check( "name", "Name is require" ).not().isEmpty(),
                check( "email", "Email is require" ).isEmail().not().isEmpty(),
                check( "password", "Password must contains at least 6 charactes" ).isLength({min:6}),
                validateFields
            ], 
            registerUserController );



// Login user with email and password
router.post('/', 
            [
                check("email", "An email valid is required").isEmail().not().isEmpty(),
                check("password", "Password must contains at least 6 charactes").isLength({min: 6}),
                validateFields
            ] , 
            loginUserController );

         

router.get( '/renew', validateToken, renewUserTokenController );



module.exports = router;
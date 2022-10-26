const registerUser = (req,res) => {
    res.status(200).json({
        statusCode: 200,
        message: "Register User"
    })
}


module.exports = {
    registerUser
}
// Create and send token and save in the cookie.
const sendToken = (user, role, statusCode, res) => {
    // Create Jwt token
    const token = user.getJwtToken();
  
    console.log(token);
    // Options for cookie
    const options = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_MODE === "production" ? true : false,
      sameSite: "none",
    };
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      token,
      user,
      role: role,
    });
  };
  
  module.exports = sendToken;
  
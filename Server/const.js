(function (global) {
    "use strict;"

    // Class ------------------------------------------------
    var Const = {};

    // Error code
    // success code
    Const.successTrue = 1;
    Const.successFalse = 0;

    Const.resNoErrorCode = 0;

    Const.resError = 100;
    Const.resDuplicatePhoneNumber = 101;
    Const.resDuplicateUsername = 102;

    Const.resPhoneNumIncorrect = 110;
    Const.resVerifyNumIncorrect = 111;
    Const.resPWIncorrect = 121;
    Const.resFacebookNotSignup = 122;
    Const.resCodeNoId = 131;

    Const.resPhoneNumOrPWIncorrect = 151;

    Const.resConfigIncorrectId = 180;

    Const.authenticateKey = "server123";

    // Error message
    // General
    Const.msgError = 'Error';

    // Authenticate
    Const.msgAuthenticateTokenFail = 'Failed to authenticate token';
    Const.msgNoTokenProvide = 'No token provided';
    Const.msgNotValidToken = 'Not valid token';

    // Web API && socket
    // Login
    Const.msgLoginSuccess = 'Login success';
    Const.msgPhoneNumberIncorrect = 'Phone number not found';
    Const.msgPasswordIncorrect = 'Your password incorrect';
    Const.msgFacebookNotSignup = "Facebook not signup";

    // Logout
    Const.msgLogoutSuccess = 'Logout success';

    // Register
    Const.msgRegisterSuccess = 'Register Success';
    Const.msgRegisterFail = 'Register Fail';

    // Check account
    Const.msgCheckAccountSuccess = 'CheckAccount Success';
    Const.msgCheckAccountFail = 'CheckAccount Fail';
    Const.msgDuplicatePhoneNumber = 'This phone number already used';
    Const.msgDuplicateUsername = 'This username already used';


    // Config
    Const.msgConfig = 'All config info';
    Const.msgConfigError = 'Error while getting config';
    Const.msgConfigIncorrectId = 'Incorrect Id';

    // New user
    Const.msgNewUser = 'New user success';

    // get room
    Const.msgGetRoom = 'get room';

    // create room
    Const.msgCreateRoom = 'Create room';

    // socket token
    Const.msgTokenSuccess = "Token success";
    Const.msgNotValidToken = "Not valid token";

    // send message
    Const.msgSendMessage = "Send message";

    // get History 
    Const.msgGetHistory = " Get history success";

    // call
    Const.msgCall = "Call";
    Const.msgAcceptCall = "Accept";
    Const.msgTimeoutCall = "Timeout call";
    Const.msgDelineCall = "Decline call";
    Const.msgReceiverNotFound = "Receiver not found";

    Const.resReceiverNotFound = 150;
    Const.resTimeotCall = 152;
    Const.resDeclineCall = 151;

    // get Lesson
    Const.msgGetLesson = "Get lesson";
    // Exports ----------------------------------------------
    module["exports"] = Const;

})((this || 0).self || global);

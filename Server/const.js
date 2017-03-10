(function (global) {
    "use strict;"

    // Class ------------------------------------------------
    var Const = {};


    Const.a = 1;

    Const.httpCodeSucceed = 200;
    Const.httpCodeFileNotFound = 404;
    Const.httpCodeSeverError = 500;
    Const.httpCodeAuthError = 503;

    Const.responsecodeSucceed = 1;
    Const.resCodeLoginNoName = 1000001;
    Const.resCodeLoginNoRoomID = 1000002;
    Const.resCodeLoginNoUserID = 1000003;
    Const.resCodeUserListNoRoomID = 1000004;
    Const.resCodeMessageListNoRoomID = 1000005;
    Const.resCodeMessageListNoLastMessageID = 1000006;
    Const.resCodeSendMessageNoFile = 1000007;
    Const.resCodeSendMessageNoRoomID = 1000008;
    Const.resCodeSendMessageNoUserID = 1000009;
    Const.resCodeSendMessageNoType = 1000010;
    Const.resCodeFileUploadNoFile = 1000011;

    Const.resCodeSocketUnknownError = 1000012;
    Const.resCodeSocketDeleteMessageNoUserID = 1000013;
    Const.resCodeSocketDeleteMessageNoMessageID = 1000014;
    Const.resCodeSocketSendMessageNoRoomID = 1000015;
    Const.resCodeSocketSendMessageNoUserId = 1000016;
    Const.resCodeSocketSendMessageNoType = 1000017;
    Const.resCodeSocketSendMessageNoMessage = 1000018;
    Const.resCodeSocketSendMessageNoLocation = 1000019;
    Const.resCodeSocketSendMessageFail = 1000020;

    Const.resCodeSocketTypingNoUserID = 1000021;
    Const.resCodeSocketTypingNoRoomID = 1000022;
    Const.resCodeSocketTypingNoType = 1000023;
    Const.resCodeSocketTypingFaild = 1000024;

    Const.resCodeSocketLoginNoUserID = 1000025;
    Const.resCodeSocketLoginNoRoomID = 1000026;

    Const.resCodeTokenError = 1000027;

    Const.resCodeStickerListFailed = 1000028;

    Const.responsecodeParamError = 2001;
    Const.responsecodeTokenError = 2100;

    Const.messageTypeText = 1;
    Const.messageTypeFile = 2;
    Const.messageTypeLocation = 3;
    Const.messageTypeContact = 4;
    Const.messageTypeSticker = 5;

    Const.messageNewUser = 1000;
    Const.messageUserLeave = 1001;

    Const.typingOn = 1;
    Const.typingOff = 0;

    Const.pagingLimit = 50;
    Const.timeZone = 7;

    Const.notificationSendMessage = "SendMessage";
    Const.notificationNewUser = "NewUser";
    Const.notificationUserTyping = "UserTyping";
    Const.notificationMessageChanges = "MessageChanges";


    Const.b = 0;


    // Error code
    // success code
    Const.successTrue = 1;
    Const.successFalse = 0;

    Const.resNoErrorCode = 0;
    Const.resEmptyDriverId = '';
    Const.resEmptyCustomerId = '';

    Const.resError = 100;
    Const.resDuplicatePhoneNumber = 101;
    Const.resDuplicateEmail = 102;

    Const.resPhoneNumIncorrect = 110;
    Const.resVerifyNumIncorrect = 111;

    Const.resPWIncorrect = 121;
    Const.resSocialIdIncorrect = 122;
    Const.resNotVerified = 123;
    Const.resBlocked = 124;
    Const.resNotActivated = 125;

    Const.resCodeNoId = 131;


    Const.resLoggedIn = 140;
    Const.resLoginFail = 141;

    Const.resPhoneNumOrPWIncorrect = 151;

    Const.resTripNotExist = 161;

    Const.resNoHistory = 171;

    Const.resConfigIncorrectId = 180;

    Const.resNoBooking = 190;
    Const.resNotValidToken = 201;

    Const.resDriverNotFound = 150;
    Const.timeBooking = 15*1000;

    Const.authenticateKey = "server123";

    // cancel trip
    Const.resCustomerCancel = 1001;
    Const.resDriverCancel = 1002;

    // feedback
    Const.resWasFeedback = 131;
    Const.msgWasFeedback = 'Journey was feedback';
    Const.msgFeedbackSuccess = 'Feedback success';

    // Error message
    // General
    Const.msgError = 'Error';

    // Authenticate
    Const.msgAuthenticateTokenFail = 'Failed to authenticate token';
    Const.msgNoTokenProvide = 'No token provided';
    Const.msgNotValidToken = 'Not valid token';

    // Web API && socket
    // Booking
    Const.msgBookingFail = 'Booking failed';
    Const.msgBookingSuccess = 'Booking success';
    Const.msgDriverNotFound = 'Driver not found';

    // Cancel Trip
    Const.msgCancelSuccess = 'Cancel success';
    Const.msgCancelError = 'Cancel error';
    Const.msgTripNotExist = 'Trip Not Exist';
    Const.msgCustomerCancel = 'Customer cancel trip';
    Const.msgDriverCancel = 'Driver cancel trip';

    // Finish Trip

    // Forget Password Customer

    // Forget Password Driver
    Const.msgCheckEmail = 'New password send. Please check your email';

    // Get Customer Location

    // Get Driver Location
    Const.msgListDriver = 'List Driver';

    // History Customer
    Const.msgListHistory = 'Your all history';
    Const.msgNoHistory = 'You have no history';
    Const.msgHistoryDetail = 'History Detail';

    // Login
    Const.msgLoginSuccess = 'Login success';
    Const.msgSocialIdIncorrect = 'Social Id not found';
    Const.msgPhoneNumberIncorrect = 'Phone number not found';
    Const.msgLoggedIn = 'This account logged in somewhere';
    Const.msgNotActive = 'Account not activate';
    Const.msgPasswordIncorrect = 'Your password incorrect';
    Const.msgBlocked = 'Your account currently block';

    // check promotion
    Const.msgPromotionCodeSuccess = 'Promotion code success';
    Const.msgPromotionCodeIncorrect = 'Incorrect promotion code';
    Const.resPromotionCodeIncorrect = 128;

    // Logout
    Const.msgLogoutSuccess = 'Logout success';

    // Register
    Const.msgRegisterSuccess = 'Register Success';
    Const.msgRegisterFail = 'Register Fail';
    Const.msgDuplicatePhoneNumber = 'This phone number already used';
    Const.msgDuplicateEmail = 'This email already used';

    Const.msgVerifySuccess = 'Verify Success';
    Const.msgVerifyNumberIncorrect = 'Verify Number Incorrect';
    Const.msgNotMatchPhoneNumber = 'Your phone number incorrect with verify code';
    Const.msgNotVerify = 'Your account not verified';

    Const.msgResendSuccess = 'Resend success';

    // Reset Password
    Const.msgResetSuccess = ' Reset success';

    // Config
    Const.msgConfig = 'All config info';
    Const.msgConfigError = 'Error while getting config';
    Const.msgConfigIncorrectId = 'Incorrect Id';

    // Journey Handle
    Const.msgNoBooking = 'No booking';
    Const.msgStartJourneySuccess = 'Start journey success';

    // Rating
    Const.msgRatingSuccess = 'Rating success';

    // socket token
    Const.msgTokenSuccess = "Token success";
    Const.msgNotValidToken = "Not valid token";

    // Exports ----------------------------------------------
    module["exports"] = Const;

})((this || 0).self || global);

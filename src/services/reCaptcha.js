const keys = require('./../../config/keys')

let Captcha = (req, res, next) => {

    if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        return res.json({ "responseError": "Please select captcha first" });
    }
    const secretKey = keys.RECAPTCHA_SECRET;

    const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

    request(verificationURL, function (error, response, body) {
        body = JSON.parse(body);

        if (body.success !== undefined && !body.success) {
            return res.json({ "responseError": "Failed captcha verification" });
        }
        res.json({ "responseSuccess": "Sucess" });
    });
    next()
}
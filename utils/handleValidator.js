const { validationResult } = require('express-validator');


const validateResults = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorArray = errors.array();
      return res.status(403).json({ errors: errorArray });
    }
    return next();
  };

module.exports = validateResults
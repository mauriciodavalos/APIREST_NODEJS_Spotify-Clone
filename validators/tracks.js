const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator")

const validatorCreateItem = [
    check("name")
    .exists()
    .notEmpty(),

  check("album")
  .exists()
  .notEmpty(),

  check("cover")
  .exists()
  .notEmpty(),

  check("artist.name")
  .exists()
  .notEmpty(),

  check("artist.nickname")
  .exists()
  .notEmpty(),

  check("artist.nationality")
  .exists()
  .notEmpty(),

  check("duration.start")
  .exists()
  .notEmpty(),

  check("duration.end")
  .exists()
  .notEmpty(),

  check("mediaId")
    .exists()
    .notEmpty()
    .isMongoId(),
    (req, res, next) => {
        return validateResults (req, res, next)
    }    

];

const validatorGetItem = [
check("id")
  .exists()
  .notEmpty()
  .isMongoId(),
  (req, res, next) => {
      return validateResults (req, res, next)
  }    

];

const validatorUpdateItem = [
  check("id")
    .exists()
    .notEmpty()
    .isMongoId(),
  check("name")
    .optional()
    .notEmpty(),
  check("album")
    .optional()
    .notEmpty(),
  check("cover")
    .optional()
    .notEmpty(),
  check("artist.name")
    .optional()
    .notEmpty(),
  check("artist.nickname")
    .optional()
    .notEmpty(),
  check("artist.nationality")
    .optional()
    .notEmpty(),
  check("duration.start")
    .optional()
    .notEmpty(),
  check("duration.end")
    .optional()
    .notEmpty(),
  check("mediaId")
    .optional()
    .notEmpty()
    .isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = {validatorCreateItem, validatorGetItem, validatorUpdateItem};
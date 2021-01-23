const parseFile = require('../helpers/parseFile');

module.exports = (filePath, delimiter = ',') => {
  return (req, res, next) => {
    function onError(error) {
      return res.status(500).json({
        success: false,
        errorMessage: 'Internal Server Error',
        errorDetails: error,
      });
    }

    function done(records) {
      res.send(200, { success: true, records });
    }

    var columns = (header) => header.map((column) => column.toLowerCase().replace(' ', '_'));
    parseFile(filePath, columns, delimiter, onError, done);
  };
};

const readline = require('readline');
const fs = require('fs');
const { splitStringToChunks } = require('../helpers');

module.exports = (filename) => {
  return async (req, res, next) => {
    try {
      const fileStream = fs.createReadStream(filename);
      let columns = ['name', 'address', 'postcode', 'phone', 'credit_limit', 'birthday'];
      let isFirstLine = true;
      const records = [];
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
      });

      for await (const line of rl) {
        if (!isFirstLine) {
          const result = splitStringToChunks(line, columns, [16, 22, 9, 14, 13, 8]);
          if (result) {
            records.push(result);
          }
        } else {
          isFirstLine = false;
        }
      }
      res.status(200).send({ success: true, records });
    } catch (error) {
      return res.status(500).json({
        success: false,
        errorMessage: 'Internal Server Error',
        errorDetails: error,
      });
    }
  };
};

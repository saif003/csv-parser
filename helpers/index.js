const Parse = require('csv-parse');
const fs = require('fs');

function parseFile(sourceFilePath, columns, delimiter, handleError, done, onNewRecord) {
  const source = fs.createReadStream(sourceFilePath);

  const parser = Parse({
    delimiter,
    rtrim: true,
    columns,
  });
  const records = [];

  parser.on('readable', () => {
    let record;
    while ((record = parser.read())) {
      records.push(record);
      if (onNewRecord) {
        onNewRecord(record);
      }
    }
  });

  parser.on('error', (error) => {
    handleError(error);
  });

  parser.on('end', () => {
    done(records);
  });

  source.pipe(parser);
}

function splitStringToChunks(str, columnNames, chunkSizes) {
  if (str) {
    let chunkStart = 0,
      chunkEnd = 0;
    return chunkSizes.reduce((result, length, index) => {
      chunkStart = chunkEnd;
      chunkEnd = chunkStart + length;
      result[columnNames[index].trim()] = str.substring(chunkStart, chunkEnd).trim();
      return result;
    }, {});
  }
}

module.exports = { parseFile, splitStringToChunks };

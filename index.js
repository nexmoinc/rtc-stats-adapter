const { iterateReports } = require("./utils");
const { parsers } = require("./parsers/new-api");
const calculateMos = require("./calculate-mos");

function parse(reports) {
  const result = {};

  iterateReports(reports, (report) => {
    if (report.type in parsers) {
      const mappedReport = parsers[report.type](report);

      Object.assign(result, mappedReport);
    }
  });

  result.networkMos = parseFloat(calculateMos(reports));

  return result;
}

module.exports = parse;

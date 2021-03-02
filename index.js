const { parsers } = require("./parsers/new-api");

function parse(stats) {
  const result = {};
  if (typeof stats[Symbol.iterator] === "function") {
    for (const el of stats) {
      const report = Array.isArray(el) ? el[1] : el;
      if (report.type in parsers) {
        const mappedReport = parsers[report.type](report);

        Object.assign(result, mappedReport);
      }
    }
  } else {
    for (const key in stats) {
      if (stats.hasOwnProperty(key)) {
        const report = stats[key];

        if (report.type in parsers) {
          const mappedReport = parsers[report.type](report);

          Object.assign(result, mappedReport);
        }
      }
    }
  }

  return result;
}

module.exports = parse;
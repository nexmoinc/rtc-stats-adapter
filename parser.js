const reports = require("./tests/fixtures/reports.json");

// Rules to map different types of reports
// Field represent an existing field name from getStats() API
// Value is a new field name which is used to store data in logStash
const rules = {
  "outbound-rtp": {
    packetsSent: "audioSentPackets",
    packetsLost: "audioSentPacketsLost",
    bytesSent: "audioSentBytes",
    roundTripTime: "audioRtt",
  },
  "inbound-rtp": {
    packetsReceived: "audioRecvPackets",
    packetsLost: "audioRecvPacketsLost",
    bytesReceived: "audioRecvBytes",
  },
};

// Additional logic to parse values can be done here
const parsers = {
  "media-source": function (report) {},
  certificate: function (report) {},
  codec: function (report) {},
  "candidate-pair": function (report) {},
  "remote-candidate": function (report) {},
  "local-candidate": function (report) {},
  "inbound-rtp": function (report) {
    return mapKeys(report);
  },
  track: function (report) {},
  stream: function (report) {},
  "outbound-rtp": function (report) {
    return mapKeys(report);
  },
  "peer-connection": function (report) {},
  "remote-inbound-rtp": function (report) {},
  transport: function (report) {},
};

const mapKeys = (report) => {
  const { type } = report;
  const mapping = rules[type];
  const result = {};

  for (let field in mapping) {
    if (field in report) {
      result[mapping[field]] = report[field];
    }
  }

  return result;
};

function parse(report) {
  const { type } = report;
  return parsers[type](report);
}

parse(reports["outbound-rtp"]);

module.exports = {
  rules,
  mappers: parsers,
};

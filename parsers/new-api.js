/** Parsers for different types of reports
 *  of a new version of getStats().then() API
 *  Transform fields names to correspond with opentok
 *	logStash schema https://raw.githubusercontent.com/opentok/schemas/84e1cd9b22daef029bec9142d2b8062debbf6f95/schemas.json?token=ABUEFFEGSWA5WXLCJAUYLTLAGZYXK
 *  and normalize values if needed
 */

const { map } = require("lodash");
const { getAddress } = require("../utils");

/**
 * Rules to map different types of reports combined by report name
 * On the left - name of the field in a report
 * On the rirgh - new name used to store in logStash
 */
const rules = {
  "outbound-rtp": {
    packetsSent: "audioSentPackets",
    bytesSent: "audioSentBytes",
  },
  "inbound-rtp": {
    packetsReceived: "audioRecvPackets",
    packetsLost: "audioRecvPacketsLost",
    bytesReceived: "audioRecvBytes",
  },
  "remote-inbound-rtp": {
    packetsLost: "audioSentPacketsLost",
    roundTripTime: "audioRtt",
  },
  "local-candidate": {
    candidateType: "audioLocalCandidateType",
  },
  "remote-candidate": {
    candidateType: "audioRemoteCandidateType",
  },
};

// Additional logic to parse values can be done here
const parsers = {
  "remote-candidate": function (report) {
    const result = mapKeys(report);

    result.audioRemoteAddress = getAddress(report);

    return result;
  },
  "local-candidate": function (report) {
    const result = mapKeys(report);

    result.audioLocalAddress = getAddress(report);
    result.transportType = report.protocol || report.transport;

    return result;
  },
  "inbound-rtp": function (report) {
    return mapKeys(report);
  },
  "outbound-rtp": function (report) {
    return mapKeys(report);
  },
  "remote-inbound-rtp": function (report) {
    return mapKeys(report);
  },
};

const mapKeys = (report) => {
  const { type } = report;
  const mapping = rules[type];
  const result = {};

  for (let field in mapping) {
    if (field in report) {
      let mappedName;

      if (typeof mapping[field] === "function") {
        mappedName = mapping[field](report);
      } else {
        mappedName = mapping[field];
      }
      result[mappedName] = report[field];
    }
  }

  return result;
};

module.exports = {
  rules,
  parsers,
};

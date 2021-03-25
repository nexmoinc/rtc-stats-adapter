/**
 * Rules to map different types of reports combined by report name
 * On the left - name of the field in a report
 * On the rirgh - new name
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
    jitter: "audioRecvJitter"
  },
  "remote-inbound-rtp": {
    packetsLost: "audioSentPacketsLost",
    roundTripTime: "audioRtt",
    jitter: "audioSentJitter"
  },
};

// Additional logic to parse values can be done here
const parsers = {
  "remote-candidate": function (report) {
    return mapKeys(report);
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
    } else {
      result[mapping[field]] = null;
    }
  }

  return result;
};

module.exports = {
  rules,
  parsers,
};

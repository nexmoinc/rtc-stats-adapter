const stats = require("./fixtures/mac/firefox/85.0.2.json");
const { mappers: parsers, rules } = require("../parsers/new-api");
const run = require("../index");

// test("should map outbound-rtp report's fields according to the rules", () => {
//   const type = "outbound-rtp";
//   const stat = stats[type];
//   const parser = parsers[type];

//   expect(Object.keys(parser(stat))).toIncludeAllMembers(
//     Object.values(rules[type])
//   );
// });

// test("should map inbound-rtp report's fields according to rules", () => {
//   const type = "inbound-rtp";
//   const stat = stats[type];
//   const mapper = parsers[type];

//   expect(Object.keys(mapper(stat))).toIncludeAllMembers(
//     Object.values(rules[type])
//   );
// });

test("should run parsers for each report and return parsed stats report", () => {
  const parsedReports = run(stats);

  const expetedResult = {
    audioLocalAddress: "90.242.135.249:63095",
    audioLocalCandidateType: "srflx",
    audioRecvBytes: 812646,
    audioRecvPackets: 25055,
    audioRecvPacketsLost: 0,
    audioRemoteAddress: "169.45.209.35:14564",
    audioRemoteCandidateType: "host",
    audioRtt: 0.092,
    audioSentBytes: 1620231,
    audioSentPackets: 25066,
    audioSentPacketsLost: 1,
    transportType: "udp",
  };

  expect(parsedReports).toStrictEqual(expetedResult);
});

const glob = require("glob");
const path = require("path");
const parse = require("../index");

const filePaths = glob.sync(__dirname + "/fixtures/**/*.json");

test.each(filePaths)(".should correctly map a report from %s", (file) => {
  const stats = require(path.resolve(file));

  const parsedReports = parse(stats);

  const expetedResult = [
    "audioRecvBytes",
    "audioRecvPackets",
    "audioRecvPacketsLost",
    "audioRtt",
    "audioSentBytes",
    "audioSentPackets",
    "audioSentPacketsLost"
  ];

  expect(Object.keys(parsedReports).sort()).toIncludeSameMembers(
    expetedResult.sort()
  );
});

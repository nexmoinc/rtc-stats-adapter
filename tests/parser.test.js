const stats = require("./fixtures/reports.json");
const { mappers: parsers, rules } = require("../parser");

test("should map outbound-rtp report's fields according to the rules", () => {
  const type = "outbound-rtp";
  const stat = stats[type];
  const mapper = parsers[type];

  expect(Object.keys(mapper(stat))).toIncludeAllMembers(
    Object.values(rules[type])
  );
});

test("should map inbound-rtp report's fields according to rules", () => {
  const type = "inbound-rtp";
  const stat = stats[type];
  const mapper = parsers[type];

  expect(Object.keys(mapper(stat))).toIncludeAllMembers(
    Object.values(rules[type])
  );
});

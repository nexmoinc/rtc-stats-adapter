const { iterateReports } = require("./utils");

function calculateMos(reports) {
  let jitter_time = 0;
  let recv_pkts = 0;
  let lost_pkts = 0;
  let average = 100.0;
  let packet_loss = 0.0;
  let effective_latency;
  let r_value;
  let mos;

  iterateReports(reports, (report) => {
    if (report.type === "inbound-rtp") {
      jitter_time = report.jitter;
      lost_pkts = report.packetsLost;
      recv_pkts = report.packetsReceived;
    }
  })

  if (recv_pkts + lost_pkts > 0) {
    packet_loss = 100.0 * (lost_pkts / (recv_pkts + lost_pkts));
  }
  effective_latency = average + jitter_time * 2 + 10;
  if (effective_latency < 160) {
    r_value = 93.2 - effective_latency / 40;
  } else {
    r_value = 93.2 - (effective_latency - 120) / 10;
  }
  r_value = r_value - packet_loss * 2.5;

  if (r_value < 1) {
    r_value = 1;
  }
  mos =
    1 + 0.035 * r_value + 0.000007 * r_value * (r_value - 60) * (100 - r_value);

  return parseFloat(mos).toFixed(6);
}

module.exports = calculateMos;

function iterateReports(stats, fn) {
  if (typeof stats[Symbol.iterator] === "function") {
    for (const el of stats) {
      const report = Array.isArray(el) ? el[1] : el;
      fn(report);
    }
  } else {
    for (const key in stats) {
      if (stats.hasOwnProperty(key)) {
        const report = stats[key];
        fn(report);
      }
    }
  }
}

module.exports = {
    iterateReports
}
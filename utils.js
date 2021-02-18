const getAddress = (res) => {
    const port = res.portNumber || res.port;
    const ip = res.ipAddress || res.address || res.ip;

    return `${ip}:${port}`;
  };

module.exports = {
    getAddress
}
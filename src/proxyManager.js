let currentProxyIndex = 0;
const proxies = [
  { ip: '192.168.1.1', location: 'New York, USA' },
  { ip: '185.93.3.1', location: 'Dubai, UAE' },
  { ip: '192.168.1.2', location: 'Los Angeles, USA' },
  { ip: '51.140.18.1', location: 'London, UK' }, 
  { ip: '103.211.2.1', location: 'Mumbai, India' },
  { ip: '203.115.52.1', location: 'Colombo, Sri Lanka' }
];

export const getNextProxy = () => {
  const proxy = proxies[currentProxyIndex];
  currentProxyIndex = (currentProxyIndex + 1) % proxies.length;
  return proxy;
};

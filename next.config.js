const path = require('path');
/** @type {import('next').NextConfig} */
module.exports = {
  poweredByHeader: false,
  productionBrowserSourceMaps: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  trailingSlash: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '~': path.resolve(__dirname, 'src'),
      'mapbox-gl': 'maplibre-gl',
    };
    return config;
  },
  reactStrictMode: true,
};

const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  disable: process.env.NODE_ENV !== 'production',
});

/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ['database'],
};

module.exports = withPWA(module.exports);

/** @type {import('next').NextConfig} */
module.exports = () => {
  return {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ["images.unsplash.com"]
    },
    env: {
      unsplash_access_key: "T9z14gkd6lf4WG5dVEdQOSQR-kYzNvrZU-SUPvoRWz4",
      unsplash_secret_key: "VzWW3Da3yam7bMnZcbECsP-AtyMHiHVROb1uvQrWMfc",
      unsplash_redirect_uri: "urn:ietf:wg:oauth:2.0:oob"
    }
  }
}

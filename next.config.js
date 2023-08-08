/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    localeDetection: false,
    locales: ["ar", "en"],
    defaultLocale: "ar"
  }
}

module.exports = nextConfig

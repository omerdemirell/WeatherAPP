const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Add custom configuration for web platform
config.resolver.sourceExts =
  process.env.RN_PLATFORM === "web"
    ? ["web.js", "js", "jsx", "json", "ts", "tsx"]
    : ["js", "json", "ts", "tsx", "jsx"];

module.exports = config;

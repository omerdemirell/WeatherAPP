export default {
  expo: {
    name: "Weather App",
    slug: "weather-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.yourcompany.weatherapp",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.yourcompany.weatherapp",
    },
    web: {
      favicon: "./assets/images/favicon.png",
      bundler: "metro",
    },
    extra: {
      weatherApiKey: process.env.EXPO_PUBLIC_WEATHER_API_KEY,
    },
    plugins: ["expo-router"],
    experiments: {
      typedRoutes: true,
      tsconfigPaths: true,
    },
  },
};

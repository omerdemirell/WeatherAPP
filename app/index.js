import { Link } from "expo-router"; // Expo Router'dan Link bileşenini import ettik.
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

const API_KEY = "7671fd92632611c3ba1b5024d4160305";
const LOCATIONS = ["Istanbul", "Ankara", "Izmir", "Antalya"];

export default function Weather() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const responses = await Promise.all(
          LOCATIONS.map((city) =>
            fetch(
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
            )
          )
        );
        const data = await Promise.all(
          responses.map((response) => response.json())
        );
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Weather</Text>
      {weatherData.length > 0 ? (
        weatherData.map((cityData, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cityName}>{cityData.name}</Text>
            <Text style={styles.temperature}>
              {Math.round(cityData.main.temp)}°C
            </Text>
            <Text style={styles.description}>
              {cityData.weather[0].description}
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.loading}>Loading...</Text>
      )}
      {/* Link ile yönlendirme ekledik */}
      <Link href="/details" style={styles.link}>
        See More Details
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      },
    }),
  },
  cityName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  temperature: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ff5733",
    marginVertical: 5,
  },
  description: {
    fontSize: 16,
    color: "#555",
  },
  loading: {
    fontSize: 18,
    color: "#777",
  },
  link: {
    fontSize: 16,
    color: "#007bff",
    textDecorationLine: "underline",
    marginTop: 20,
    textAlign: "center",
  },
});

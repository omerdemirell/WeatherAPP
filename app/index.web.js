import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

const API_KEY = "7671fd92632611c3ba1b5024d4160305";
const LOCATIONS = ["Istanbul", "Ankara", "Izmir", "Antalya"];

export default function Home() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          responses.map(async (response) => {
            if (!response.ok) throw new Error("Weather data fetch failed");
            return response.json();
          })
        );

        setWeatherData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  return (
    // Ana sayfanın arka planına görsel ekliyoruz
    <ImageBackground
      source={require("../assets/images/background.jpg")} // Sabit arka plan görseli
      style={[styles.container, styles.background]} // Arka plan için stil ekliyoruz
      resizeMode="cover" // Resmi ekrana yayılacak şekilde ayarlıyoruz
    >
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
            <Text style={styles.humidity}>
              Humidity: {cityData.main.humidity}%
            </Text>
            <Text style={styles.wind}>
              Wind Speed: {cityData.wind.speed} m/s
            </Text>
            {cityData.rain && cityData.rain["1h"] && (
              <Text style={styles.rain}>
                Rain (last 1 hour): {cityData.rain["1h"]} mm
              </Text>
            )}
          </View>
        ))
      ) : (
        <Text style={styles.loading}>Loading...</Text>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center", // İçeriği yatayda ve dikeyde ortalamak için
  },

  card: {
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Beyaz ancak biraz şeffaf
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
    fontWeight: "bold",
  },
  humidity: {
    fontSize: 16,
    color: "#555",
    fontWeight: "bold",
  },
  wind: {
    fontSize: 16,
    color: "#555",
    fontWeight: "bold",
  },
  rain: {
    fontSize: 16,
    color: "#555",
    fontWeight: "bold",
  },
  loading: {
    fontSize: 18,
    color: "#777",
    fontWeight: "bold",
  },
});

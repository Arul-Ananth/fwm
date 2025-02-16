/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package vit.api.services;


import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import vit.api.services.model.Restaurant;

public class ResJDBCService {

    // Insert a new restaurant
    public boolean insertRestaurant(Restaurant restaurant) {
        String sql = "INSERT INTO restaurant (name, identifier, lat, lng) VALUES (?, ?, ?, ?)";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, restaurant.getName());
            stmt.setString(2, restaurant.getIdentifier());
            stmt.setString(3, restaurant.getLat());
            stmt.setString(4, restaurant.getLng());

            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // Update restaurant by ID
    public boolean updateRestaurant(int id, Restaurant restaurant) {
        String sql = "UPDATE restaurant SET name = ?, identifier = ?, lat = ?, lng = ? WHERE id = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, restaurant.getName());
            stmt.setString(2, restaurant.getIdentifier());
            stmt.setString(3, restaurant.getLat());
            stmt.setString(4, restaurant.getLng());
            stmt.setInt(5, id);

            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // Delete restaurant by ID
    public boolean deleteRestaurant(int id) {

        String sql = "DELETE FROM restaurant WHERE id = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // Get a restaurant by ID
    public Restaurant getRestaurantById(int id) {
        String sql = "SELECT * FROM restaurant WHERE id = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                return new Restaurant(
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getString("identifier"),
                    rs.getString("lat"),
                    rs.getString("lng")
                );
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    // Get all restaurants
    public List<Restaurant> getAllRestaurants() {
        String sql = "SELECT * FROM restaurant";
        List<Restaurant> restaurants = new ArrayList<>();

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                restaurants.add(new Restaurant(
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getString("identifier"),
                    rs.getString("lat"),
                    rs.getString("lng")
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return restaurants;
    }
}

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package vit.api.services.model;

/**
 *
 * @author arula_5l7a56n
 */
public class Restaurant {

    private String name;
    private String lat;
    private String lng;

    private String identifier;
    
    private int id;

    public Restaurant() {

    }

    public Restaurant(int aInt, String name, String lat, String lng, String identifier) {
     
        this.name = name;
        this.lat = lat;
        this.lng= lng;
        this.id = aInt;
        
        this.identifier = identifier;
    }
        
    

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return the lat
     */
    public String getLat() {
        return lat;
    }

    /**
     * @param lat the lat to set
     */
    public void setLat(String lat) {
        this.lat = lat;
    }

    /**
     * @return the lng
     */
    public String getLng() {
        return lng;
    }

    /**
     * @param lng the lng to set
     */
    public void setLng(String lng) {
        this.lng = lng;
    }

    /**
     * @return the identifier
     */
    public String getIdentifier() {
        return identifier;
    }

    /**
     * @param identifier the identifier to set
     */
    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    
    public String toString(){
         
        return "{" + name + " : " + lat +" : " + lng +" }";
        
    }
}
 
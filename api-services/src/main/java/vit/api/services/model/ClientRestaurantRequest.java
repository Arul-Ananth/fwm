package vit.api.services.model;

public class ClientRestaurantRequest {
    private String name;
    private String lat;
    private String lng;

    public ClientRestaurantRequest(){

    }

    public String getName(){
        return name;
    }

    public void setName(String name){
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


}

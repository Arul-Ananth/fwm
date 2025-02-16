package vit.api.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import vit.api.services.model.ClientRestaurantRequest;
import vit.api.services.model.Restaurant;

@RestController
@RequestMapping("/api")

public class RestaurantService {

    private ResJDBCService resJDBCService;

    @PostMapping("/restaurant/add")
    public ResponseEntity<Restaurant> Add(@RequestBody ClientRestaurantRequest request) {
        RestaurantService restaurantService;
        // Store in a file 
        Restaurant res = new Restaurant();
        res.setName(request.getName());
        res.setLat(request.getLat());
        res.setLng(request.getLng());
        
        // store in DB , on storage get the Identifier from db or gnerate one.
        
        res.setIdentifier(request.getName());       
        
        ResJDBCService src = new ResJDBCService();
        src.insertRestaurant(res);
        
        
        System.out.println(" Save Sucessfully" + res.toString());
        

        return ResponseEntity.ok(res);
    }
    
    
    
     @GetMapping("/restaurant/list")     
     public ResponseEntity<List<Restaurant>> list(){
         
         ResJDBCService src = new ResJDBCService();
         
         return ResponseEntity.ok(src.getAllRestaurants());
         
     }

     @DeleteMapping("/restaurant/delete")

     public ResponseEntity<Void> deleteRestaurant(@PathVariable Integer id) {

         resJDBCService.deleteRestaurant(id);
         return ResponseEntity.ok().build();
     }


     
}



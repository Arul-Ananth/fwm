/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package vit.api.services;

import org.springframework.web.bind.annotation.*;
import vit.api.services.model.LoginRequest;
import vit.api.services.model.Person;
import vit.api.services.PersonService;

@RestController
@RequestMapping("/api")
public class AuthController {


    PersonService personService = new PersonService();

    @PostMapping("/login")
    public Person login(@RequestBody LoginRequest request) {

        return personService.login(request.getUserName(), request.getPassword());

    }
    
    @GetMapping("/person")
    public Person getPerson(String userName) {

        return personService.getPerson(userName) ;
    }

    @PostMapping("/register")
    public Person register(@RequestBody LoginRequest request) {

        return personService.register(new Person( request.getUserName(),
                request.getUserName(), request.getPassword(),
                request.getFirstName(), request.getLastName(),
                request.getPhonenumber()));



    }


}

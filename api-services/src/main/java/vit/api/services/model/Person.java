package vit.api.services.model;

public class Person {

//create table person ( username varchar(50)  , passwordUser varchar(50) , firstName varchar(50) , lastName varchar(50) ,  phonenumber varchar(20) , email varchar(100));
//insert into  person values ( "Arul" , "admin" , "Arul" , "Ananth" , "9600170454" , "a.arul.ananth.2006@gmail.com");

    private String userName;
    private String passwordUser ;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;

    public Person(String userName, String passwordUser, String firstName, String lastName, String phoneNumber, String email) {
        this.userName = userName;
        this.passwordUser = passwordUser;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    public String getUserName() {
        return userName;
    }

    public String getPasswordUser() {
        return passwordUser;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPasswordUser(String passwordUser) {
        this.passwordUser = passwordUser;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
package vit.api.services;

import vit.api.services.model.Person;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class PersonService {
    String registerSql = "insert into person (username , passwordUser , firstName , lastName, phonenumber, email) values (? , ? , ? , ? , ?, ?)";
    String loginSql = "select username , passwordUser , firstName , lastName, phonenumber, email from person where username = ? and passwordUser = ? ";
    String getPersonSql = "select username , passwordUser , firstName , lastName, phonenumber, email from person where username = ?";;




    public Person register (Person person){
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(registerSql)){

            stmt.setString(1, person.getUserName());
            stmt.setString(2 , person.getPasswordUser() );
            stmt.setString(3 , person.getFirstName());
            stmt.setString(4 , person.getLastName());
            stmt.setString(5 , person.getPhoneNumber());
            stmt.setString(6 , person.getEmail());


        }
        catch ( SQLException e ){
            e.printStackTrace();


        }
        return null;
    }

    public Person login (String userName , String password ){
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(loginSql)){

            stmt.setString(1 , userName);
            stmt.setString(2 , password);

            ResultSet rs = stmt.executeQuery();
            if ( rs.next()){
                return  new Person(
                        rs.getString("username"),
                        rs.getString("passwordUser"),
                        rs.getString("firstName"),
                        rs.getString("lastName"),
                        rs.getString("phonenumber"),
                        rs.getString("email")
                );
            }


        }
        catch (SQLException e ){
            e.printStackTrace();
        }
        return null;
    }
    public Person getPerson (String userName ){

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(loginSql)){

            stmt.setString(1 , userName);
            ResultSet rs = stmt.executeQuery();
            if ( rs.next()){
                return  new Person(
                        rs.getString("username"),
                        rs.getString("passwordUser"),
                        rs.getString("firstName"),
                        rs.getString("lastName"),
                        rs.getString("phonenumber"),
                        rs.getString("email")



                );
            }

        }
        catch (SQLException e ){
            e.printStackTrace();

        }

        return null;

    }


}

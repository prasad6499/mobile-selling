package com.cdac.mobileselling.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;


@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String userName;
    private String contactNumber;
    private String email;
    private String password;
    private Boolean isEnabled;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "USER_ROLES", joinColumns = @JoinColumn(name = "USER_ID"), inverseJoinColumns = @JoinColumn(name = "ROLES_ID"))
    private Set<Roles> roles= new HashSet<>();

    public User() {
    }

    public User(String userName, String contactNumber, String email, String password, Boolean isEnabled) {
        this.userName = userName;
        this.contactNumber = contactNumber;
        this.email = email;
        this.password = password;
        this.isEnabled = isEnabled;
    }

    public User(String userName, String contactNumber, String email, String password, Boolean isEnabled, Set<Roles> roles) {
        this.userName = userName;
        this.contactNumber = contactNumber;
        this.email = email;
        this.password = password;
        this.isEnabled = isEnabled;
        this.roles = roles;
    }

    public Set<Roles> getRoles() {
        return roles;
    }

    public void setRoles(Set<Roles> roles) {
        this.roles = roles;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getEnabled() {
        return isEnabled;
    }

    public void setEnabled(Boolean enabled) {
        isEnabled = enabled;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", userName='" + userName + '\'' +
                ", contactNumber='" + contactNumber + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", isEnabled=" + isEnabled +
                ", roles=" + roles +
                '}';
    }
}

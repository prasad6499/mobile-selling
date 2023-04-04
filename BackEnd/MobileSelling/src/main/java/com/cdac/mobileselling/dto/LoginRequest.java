package com.cdac.mobileselling.dto;



public class LoginRequest {
    private String email;
    private String password;


    public LoginRequest() {
    }

    public LoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "{" +
                " email='" + getEmail() + "'" +
                ", password='" + getPassword() + "'" +
                "}";
    }


}

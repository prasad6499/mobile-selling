package com.cdac.mobileselling.dto;

public class LoginResponse {
    private String email;
    private String token;
    private String userName;
    private Boolean success;
    private String role;


    public LoginResponse() {
    }

    public LoginResponse(String email, String token, String userName, Boolean success, String role) {
        this.email = email;
        this.token = token;
        this.userName = userName;
        this.success = success;
        this.role = role;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getToken() {
        return this.token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Boolean isSuccess() {
        return this.success;
    }

    public Boolean getSuccess() {
        return this.success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public String getRole() {
        return this.role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public LoginResponse email(String email) {
        setEmail(email);
        return this;
    }

    public LoginResponse token(String token) {
        setToken(token);
        return this;
    }

    public LoginResponse userName(String userName) {
        setUserName(userName);
        return this;
    }

    public LoginResponse success(Boolean success) {
        setSuccess(success);
        return this;
    }

    public LoginResponse role(String role) {
        setRole(role);
        return this;
    }

    @Override
    public String toString() {
        return "{" +
                " email='" + getEmail() + "'" +
                ", token='" + getToken() + "'" +
                ", userName='" + getUserName() + "'" +
                ", success='" + isSuccess() + "'" +
                ", role='" + getRole() + "'" +
                "}";
    }

}

package com.cdac.mobileselling.model;

import javax.persistence.*;

@Entity
public class Roles {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ROLES_ID")
    private Long rolesId;
    @Enumerated(EnumType.STRING)
    @Column(name = "ROLE_NAME")
    private Role roleName;

    public Roles(Role user)
    {
        this.roleName = user;
    }


    public Roles() {
    }


    public Long getRolesId() {
        return this.rolesId;
    }

    public void setRolesId(Long rolesId) {
        this.rolesId = rolesId;
    }

    public Role getRoleName() {
        return this.roleName;
    }

    public void setRoleName(Role roleName) {
        this.roleName = roleName;
    }


    @Override
    public String toString() {
        return "{" +
                " rolesId='" + getRolesId() + "'" +
                ", roleName='" + getRoleName() + "'" +
                "}";
    }


}

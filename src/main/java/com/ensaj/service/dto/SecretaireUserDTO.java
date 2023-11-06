package com.ensaj.service.dto;

import com.ensaj.domain.Secretaire;
import com.ensaj.web.rest.vm.ManagedUserVM;

public class SecretaireUserDTO {

    private ManagedUserVM user;
    private Secretaire secretaire;

    public SecretaireUserDTO() {}

    public ManagedUserVM getUser() {
        return user;
    }

    public void setUser(ManagedUserVM user) {
        this.user = user;
    }

    public Secretaire getSecretaire() {
        return secretaire;
    }

    public void setSecretaire(Secretaire secretaire) {
        this.secretaire = secretaire;
    }
}

package com.ensaj.service.dto;

import com.ensaj.domain.Dermatologue;
import com.ensaj.web.rest.vm.ManagedUserVM;

public class DermatologueUserDTO {

    private ManagedUserVM user;
    private Dermatologue dermatologue;

    public DermatologueUserDTO() {}

    public ManagedUserVM getUser() {
        return user;
    }

    public void setUser(ManagedUserVM user) {
        this.user = user;
    }

    public Dermatologue getDermatologue() {
        return dermatologue;
    }

    public void setDermatologue(Dermatologue dermatologue) {
        this.dermatologue = dermatologue;
    }
}

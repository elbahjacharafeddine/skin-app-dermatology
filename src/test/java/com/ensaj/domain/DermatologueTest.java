package com.ensaj.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.ensaj.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DermatologueTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Dermatologue.class);
        Dermatologue dermatologue1 = new Dermatologue();
        dermatologue1.setId("id1");
        Dermatologue dermatologue2 = new Dermatologue();
        dermatologue2.setId(dermatologue1.getId());
        assertThat(dermatologue1).isEqualTo(dermatologue2);
        dermatologue2.setId("id2");
        assertThat(dermatologue1).isNotEqualTo(dermatologue2);
        dermatologue1.setId(null);
        assertThat(dermatologue1).isNotEqualTo(dermatologue2);
    }
}

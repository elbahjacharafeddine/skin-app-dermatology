package com.ensaj.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.ensaj.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class RendezVousTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RendezVous.class);
        RendezVous rendezVous1 = new RendezVous();
        rendezVous1.setId("id1");
        RendezVous rendezVous2 = new RendezVous();
        rendezVous2.setId(rendezVous1.getId());
        assertThat(rendezVous1).isEqualTo(rendezVous2);
        rendezVous2.setId("id2");
        assertThat(rendezVous1).isNotEqualTo(rendezVous2);
        rendezVous1.setId(null);
        assertThat(rendezVous1).isNotEqualTo(rendezVous2);
    }
}

package com.ensaj.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.ensaj.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class StadeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Stade.class);
        Stade stade1 = new Stade();
        stade1.setId("id1");
        Stade stade2 = new Stade();
        stade2.setId(stade1.getId());
        assertThat(stade1).isEqualTo(stade2);
        stade2.setId("id2");
        assertThat(stade1).isNotEqualTo(stade2);
        stade1.setId(null);
        assertThat(stade1).isNotEqualTo(stade2);
    }
}

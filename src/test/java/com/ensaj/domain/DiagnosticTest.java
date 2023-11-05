package com.ensaj.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.ensaj.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DiagnosticTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Diagnostic.class);
        Diagnostic diagnostic1 = new Diagnostic();
        diagnostic1.setId("id1");
        Diagnostic diagnostic2 = new Diagnostic();
        diagnostic2.setId(diagnostic1.getId());
        assertThat(diagnostic1).isEqualTo(diagnostic2);
        diagnostic2.setId("id2");
        assertThat(diagnostic1).isNotEqualTo(diagnostic2);
        diagnostic1.setId(null);
        assertThat(diagnostic1).isNotEqualTo(diagnostic2);
    }
}

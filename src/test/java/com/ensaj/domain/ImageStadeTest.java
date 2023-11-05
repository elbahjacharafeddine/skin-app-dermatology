package com.ensaj.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.ensaj.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ImageStadeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ImageStade.class);
        ImageStade imageStade1 = new ImageStade();
        imageStade1.setId("id1");
        ImageStade imageStade2 = new ImageStade();
        imageStade2.setId(imageStade1.getId());
        assertThat(imageStade1).isEqualTo(imageStade2);
        imageStade2.setId("id2");
        assertThat(imageStade1).isNotEqualTo(imageStade2);
        imageStade1.setId(null);
        assertThat(imageStade1).isNotEqualTo(imageStade2);
    }
}

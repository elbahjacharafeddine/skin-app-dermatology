package com.ensaj.web.rest;

import com.ensaj.domain.Maladie;
import com.ensaj.repository.MaladieRepository;
import com.ensaj.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.ensaj.domain.Maladie}.
 */
@RestController
@RequestMapping("/api/maladies")
public class MaladieResource {

    private final Logger log = LoggerFactory.getLogger(MaladieResource.class);

    private static final String ENTITY_NAME = "maladie";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MaladieRepository maladieRepository;

    public MaladieResource(MaladieRepository maladieRepository) {
        this.maladieRepository = maladieRepository;
    }

    /**
     * {@code POST  /maladies} : Create a new maladie.
     *
     * @param maladie the maladie to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new maladie, or with status {@code 400 (Bad Request)} if the maladie has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Maladie> createMaladie(@RequestBody Maladie maladie) throws URISyntaxException {
        log.debug("REST request to save Maladie : {}", maladie);
        if (maladie.getId() != null) {
            throw new BadRequestAlertException("A new maladie cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Maladie result = maladieRepository.save(maladie);
        return ResponseEntity
            .created(new URI("/api/maladies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /maladies/:id} : Updates an existing maladie.
     *
     * @param id the id of the maladie to save.
     * @param maladie the maladie to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated maladie,
     * or with status {@code 400 (Bad Request)} if the maladie is not valid,
     * or with status {@code 500 (Internal Server Error)} if the maladie couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Maladie> updateMaladie(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody Maladie maladie
    ) throws URISyntaxException {
        log.debug("REST request to update Maladie : {}, {}", id, maladie);
        if (maladie.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, maladie.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!maladieRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Maladie result = maladieRepository.save(maladie);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, maladie.getId()))
            .body(result);
    }

    /**
     * {@code PATCH  /maladies/:id} : Partial updates given fields of an existing maladie, field will ignore if it is null
     *
     * @param id the id of the maladie to save.
     * @param maladie the maladie to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated maladie,
     * or with status {@code 400 (Bad Request)} if the maladie is not valid,
     * or with status {@code 404 (Not Found)} if the maladie is not found,
     * or with status {@code 500 (Internal Server Error)} if the maladie couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Maladie> partialUpdateMaladie(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody Maladie maladie
    ) throws URISyntaxException {
        log.debug("REST request to partial update Maladie partially : {}, {}", id, maladie);
        if (maladie.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, maladie.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!maladieRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Maladie> result = maladieRepository
            .findById(maladie.getId())
            .map(existingMaladie -> {
                if (maladie.getFullName() != null) {
                    existingMaladie.setFullName(maladie.getFullName());
                }
                if (maladie.getAbbr() != null) {
                    existingMaladie.setAbbr(maladie.getAbbr());
                }

                return existingMaladie;
            })
            .map(maladieRepository::save);

        return ResponseUtil.wrapOrNotFound(result, HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, maladie.getId()));
    }

    /**
     * {@code GET  /maladies} : get all the maladies.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of maladies in body.
     */
    @GetMapping("")
    public List<Maladie> getAllMaladies() {
        log.debug("REST request to get all Maladies");
        return maladieRepository.findAll();
    }

    /**
     * {@code GET  /maladies/:id} : get the "id" maladie.
     *
     * @param id the id of the maladie to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the maladie, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Maladie> getMaladie(@PathVariable String id) {
        log.debug("REST request to get Maladie : {}", id);
        Optional<Maladie> maladie = maladieRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(maladie);
    }

    /**
     * {@code DELETE  /maladies/:id} : delete the "id" maladie.
     *
     * @param id the id of the maladie to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMaladie(@PathVariable String id) {
        log.debug("REST request to delete Maladie : {}", id);
        maladieRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}

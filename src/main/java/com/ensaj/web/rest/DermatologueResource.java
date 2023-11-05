package com.ensaj.web.rest;

import com.ensaj.domain.Dermatologue;
import com.ensaj.repository.DermatologueRepository;
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
 * REST controller for managing {@link com.ensaj.domain.Dermatologue}.
 */
@RestController
@RequestMapping("/api/dermatologues")
public class DermatologueResource {

    private final Logger log = LoggerFactory.getLogger(DermatologueResource.class);

    private static final String ENTITY_NAME = "dermatologue";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DermatologueRepository dermatologueRepository;

    public DermatologueResource(DermatologueRepository dermatologueRepository) {
        this.dermatologueRepository = dermatologueRepository;
    }

    /**
     * {@code POST  /dermatologues} : Create a new dermatologue.
     *
     * @param dermatologue the dermatologue to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dermatologue, or with status {@code 400 (Bad Request)} if the dermatologue has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Dermatologue> createDermatologue(@RequestBody Dermatologue dermatologue) throws URISyntaxException {
        log.debug("REST request to save Dermatologue : {}", dermatologue);
        if (dermatologue.getId() != null) {
            throw new BadRequestAlertException("A new dermatologue cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Dermatologue result = dermatologueRepository.save(dermatologue);
        return ResponseEntity
            .created(new URI("/api/dermatologues/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /dermatologues/:id} : Updates an existing dermatologue.
     *
     * @param id the id of the dermatologue to save.
     * @param dermatologue the dermatologue to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dermatologue,
     * or with status {@code 400 (Bad Request)} if the dermatologue is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dermatologue couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Dermatologue> updateDermatologue(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody Dermatologue dermatologue
    ) throws URISyntaxException {
        log.debug("REST request to update Dermatologue : {}, {}", id, dermatologue);
        if (dermatologue.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, dermatologue.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!dermatologueRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Dermatologue result = dermatologueRepository.save(dermatologue);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, dermatologue.getId()))
            .body(result);
    }

    /**
     * {@code PATCH  /dermatologues/:id} : Partial updates given fields of an existing dermatologue, field will ignore if it is null
     *
     * @param id the id of the dermatologue to save.
     * @param dermatologue the dermatologue to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dermatologue,
     * or with status {@code 400 (Bad Request)} if the dermatologue is not valid,
     * or with status {@code 404 (Not Found)} if the dermatologue is not found,
     * or with status {@code 500 (Internal Server Error)} if the dermatologue couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Dermatologue> partialUpdateDermatologue(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody Dermatologue dermatologue
    ) throws URISyntaxException {
        log.debug("REST request to partial update Dermatologue partially : {}, {}", id, dermatologue);
        if (dermatologue.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, dermatologue.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!dermatologueRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Dermatologue> result = dermatologueRepository
            .findById(dermatologue.getId())
            .map(existingDermatologue -> {
                if (dermatologue.getCodeEmp() != null) {
                    existingDermatologue.setCodeEmp(dermatologue.getCodeEmp());
                }
                if (dermatologue.getGenre() != null) {
                    existingDermatologue.setGenre(dermatologue.getGenre());
                }
                if (dermatologue.getTelephone() != null) {
                    existingDermatologue.setTelephone(dermatologue.getTelephone());
                }

                return existingDermatologue;
            })
            .map(dermatologueRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, dermatologue.getId())
        );
    }

    /**
     * {@code GET  /dermatologues} : get all the dermatologues.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dermatologues in body.
     */
    @GetMapping("")
    public List<Dermatologue> getAllDermatologues() {
        log.debug("REST request to get all Dermatologues");
        return dermatologueRepository.findAll();
    }

    /**
     * {@code GET  /dermatologues/:id} : get the "id" dermatologue.
     *
     * @param id the id of the dermatologue to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dermatologue, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Dermatologue> getDermatologue(@PathVariable String id) {
        log.debug("REST request to get Dermatologue : {}", id);
        Optional<Dermatologue> dermatologue = dermatologueRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(dermatologue);
    }

    /**
     * {@code DELETE  /dermatologues/:id} : delete the "id" dermatologue.
     *
     * @param id the id of the dermatologue to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDermatologue(@PathVariable String id) {
        log.debug("REST request to delete Dermatologue : {}", id);
        dermatologueRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}

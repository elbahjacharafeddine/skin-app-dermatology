package com.ensaj.web.rest;

import com.ensaj.domain.Secretaire;
import com.ensaj.repository.SecretaireRepository;
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
 * REST controller for managing {@link com.ensaj.domain.Secretaire}.
 */
@RestController
@RequestMapping("/api/secretaires")
public class SecretaireResource {

    private final Logger log = LoggerFactory.getLogger(SecretaireResource.class);

    private static final String ENTITY_NAME = "secretaire";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SecretaireRepository secretaireRepository;

    public SecretaireResource(SecretaireRepository secretaireRepository) {
        this.secretaireRepository = secretaireRepository;
    }

    /**
     * {@code POST  /secretaires} : Create a new secretaire.
     *
     * @param secretaire the secretaire to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new secretaire, or with status {@code 400 (Bad Request)} if the secretaire has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Secretaire> createSecretaire(@RequestBody Secretaire secretaire) throws URISyntaxException {
        log.debug("REST request to save Secretaire : {}", secretaire);
        if (secretaire.getId() != null) {
            throw new BadRequestAlertException("A new secretaire cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Secretaire result = secretaireRepository.save(secretaire);
        return ResponseEntity
            .created(new URI("/api/secretaires/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
            .body(result);
    }

    /**
     * {@code PUT  /secretaires/:id} : Updates an existing secretaire.
     *
     * @param id the id of the secretaire to save.
     * @param secretaire the secretaire to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated secretaire,
     * or with status {@code 400 (Bad Request)} if the secretaire is not valid,
     * or with status {@code 500 (Internal Server Error)} if the secretaire couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Secretaire> updateSecretaire(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody Secretaire secretaire
    ) throws URISyntaxException {
        log.debug("REST request to update Secretaire : {}, {}", id, secretaire);
        if (secretaire.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, secretaire.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!secretaireRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Secretaire result = secretaireRepository.save(secretaire);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, secretaire.getId()))
            .body(result);
    }

    /**
     * {@code PATCH  /secretaires/:id} : Partial updates given fields of an existing secretaire, field will ignore if it is null
     *
     * @param id the id of the secretaire to save.
     * @param secretaire the secretaire to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated secretaire,
     * or with status {@code 400 (Bad Request)} if the secretaire is not valid,
     * or with status {@code 404 (Not Found)} if the secretaire is not found,
     * or with status {@code 500 (Internal Server Error)} if the secretaire couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Secretaire> partialUpdateSecretaire(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody Secretaire secretaire
    ) throws URISyntaxException {
        log.debug("REST request to partial update Secretaire partially : {}, {}", id, secretaire);
        if (secretaire.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, secretaire.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!secretaireRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Secretaire> result = secretaireRepository
            .findById(secretaire.getId())
            .map(existingSecretaire -> {
                if (secretaire.getCodeEmp() != null) {
                    existingSecretaire.setCodeEmp(secretaire.getCodeEmp());
                }
                if (secretaire.getGenre() != null) {
                    existingSecretaire.setGenre(secretaire.getGenre());
                }
                if (secretaire.getTelephone() != null) {
                    existingSecretaire.setTelephone(secretaire.getTelephone());
                }

                return existingSecretaire;
            })
            .map(secretaireRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, secretaire.getId())
        );
    }

    /**
     * {@code GET  /secretaires} : get all the secretaires.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of secretaires in body.
     */
    @GetMapping("")
    public List<Secretaire> getAllSecretaires() {
        log.debug("REST request to get all Secretaires");
        return secretaireRepository.findAll();
    }

    /**
     * {@code GET  /secretaires/:id} : get the "id" secretaire.
     *
     * @param id the id of the secretaire to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the secretaire, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Secretaire> getSecretaire(@PathVariable String id) {
        log.debug("REST request to get Secretaire : {}", id);
        Optional<Secretaire> secretaire = secretaireRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(secretaire);
    }

    /**
     * {@code DELETE  /secretaires/:id} : delete the "id" secretaire.
     *
     * @param id the id of the secretaire to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSecretaire(@PathVariable String id) {
        log.debug("REST request to delete Secretaire : {}", id);
        secretaireRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}

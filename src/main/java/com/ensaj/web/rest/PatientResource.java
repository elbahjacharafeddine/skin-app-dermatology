package com.ensaj.web.rest;

import com.ensaj.domain.Authority;
import com.ensaj.domain.Patient;
import com.ensaj.domain.User;
import com.ensaj.repository.AuthorityRepository;
import com.ensaj.repository.PatientRepository;
import com.ensaj.repository.UserRepository;
import com.ensaj.security.AuthoritiesConstants;
import com.ensaj.service.UserService;
import com.ensaj.service.dto.PatientUserDTO;
import com.ensaj.web.rest.errors.BadRequestAlertException;
import com.ensaj.web.rest.vm.ManagedUserVM;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
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
 * REST controller for managing {@link com.ensaj.domain.Patient}.
 */
@RestController
@RequestMapping("/api/patients")
public class PatientResource {

    private final Logger log = LoggerFactory.getLogger(PatientResource.class);

    private static final String ENTITY_NAME = "patient";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final AuthorityRepository authorityRepository;

    public PatientResource(
        PatientRepository patientRepository,
        UserRepository userRepository,
        UserService userService,
        AuthorityRepository authorityRepository
    ) {
        this.patientRepository = patientRepository;
        this.userRepository = userRepository;
        this.userService = userService;
        this.authorityRepository = authorityRepository;
    }

    //    @PostMapping("")
    //    public ResponseEntity<Patient> createPatient(@RequestBody Patient patient) throws URISyntaxException {
    //        log.debug("REST request to save Patient : {}", patient);
    //        if (patient.getId() != null) {
    //            throw new BadRequestAlertException("A new patient cannot already have an ID", ENTITY_NAME, "idexists");
    //        }
    //        Patient result = patientRepository.save(patient);
    //        return ResponseEntity
    //            .created(new URI("/api/patients/" + result.getId()))
    //            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()))
    //            .body(result);
    //    }

    @PostMapping("")
    public ResponseEntity<Patient> createPatient(@RequestBody PatientUserDTO patientUserDTO) throws URISyntaxException {
        log.debug("REST request to save Patient : {}", patientUserDTO);
        if (patientUserDTO.getUser().getId() != null) {
            throw new BadRequestAlertException("A new patient cannot already have an ID", ENTITY_NAME, "idexists");
        }

        Patient patient = patientUserDTO.getPatient();

        //        String dateStr = "2023/11/10"; // Replace with the date string you receive from the request
        //        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        //        LocalDate localDate = LocalDate.parse(dateStr, dateFormatter);
        //
        //        // You can set the time to a default value if needed, like midnight (00:00:00)
        //        LocalTime localTime = LocalTime.of(0, 0, 0);
        //        ZonedDateTime zonedDateTime = ZonedDateTime.of(localDate, localTime, ZonedDateTime.now().getZone());
        //
        //        // Convert ZonedDateTime to Instant
        //        Instant instant = zonedDateTime.toInstant();

        //        patient.setBirthdate(instant);

        ManagedUserVM puser = patientUserDTO.getUser();

        puser.setAuthorities(new HashSet<>());
        puser.getAuthorities().add(AuthoritiesConstants.PATIENT);

        User user = userService.createAdministrateurUser(puser);

        patient.setUser(user);

        Patient res = patientRepository.save(patient);

        return ResponseEntity
            .created(new URI("/api/patients/" + res.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, res.getId()))
            .body(res);
    }

    /**
     * {@code PUT  /patients/:id} : Updates an existing patient.
     *
     * @param id the id of the patient to save.
     * @param patient the patient to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated patient,
     * or with status {@code 400 (Bad Request)} if the patient is not valid,
     * or with status {@code 500 (Internal Server Error)} if the patient couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody Patient patient
    ) throws URISyntaxException {
        log.debug("REST request to update Patient : {}, {}", id, patient);
        if (patient.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, patient.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!patientRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Patient result = patientRepository.save(patient);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, patient.getId()))
            .body(result);
    }

    /**
     * {@code PATCH  /patients/:id} : Partial updates given fields of an existing patient, field will ignore if it is null
     *
     * @param id the id of the patient to save.
     * @param patient the patient to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated patient,
     * or with status {@code 400 (Bad Request)} if the patient is not valid,
     * or with status {@code 404 (Not Found)} if the patient is not found,
     * or with status {@code 500 (Internal Server Error)} if the patient couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Patient> partialUpdatePatient(
        @PathVariable(value = "id", required = false) final String id,
        @RequestBody Patient patient
    ) throws URISyntaxException {
        log.debug("REST request to partial update Patient partially : {}, {}", id, patient);
        if (patient.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, patient.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!patientRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Patient> result = patientRepository
            .findById(patient.getId())
            .map(existingPatient -> {
                if (patient.getBirthdate() != null) {
                    existingPatient.setBirthdate(patient.getBirthdate());
                }
                if (patient.getAdress() != null) {
                    existingPatient.setAdress(patient.getAdress());
                }
                if (patient.getGenre() != null) {
                    existingPatient.setGenre(patient.getGenre());
                }
                if (patient.getTelephone() != null) {
                    existingPatient.setTelephone(patient.getTelephone());
                }

                return existingPatient;
            })
            .map(patientRepository::save);

        return ResponseUtil.wrapOrNotFound(result, HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, patient.getId()));
    }

    /**
     * {@code GET  /patients} : get all the patients.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of patients in body.
     */
    @GetMapping("")
    public List<Patient> getAllPatients() {
        log.debug("REST request to get all Patients");
        return patientRepository.findAll();
    }

    /**
     * {@code GET  /patients/:id} : get the "id" patient.
     *
     * @param id the id of the patient to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the patient, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatient(@PathVariable String id) {
        log.debug("REST request to get Patient : {}", id);
        Optional<Patient> patient = patientRepository.findById(id);
        Optional<User> user = userRepository.findById(id);
        patient.get().setUser(user.get());
        return ResponseUtil.wrapOrNotFound(patient);
    }

    /**
     * {@code DELETE  /patients/:id} : delete the "id" patient.
     *
     * @param id the id of the patient to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable String id) {
        log.debug("REST request to delete Patient : {}", id);
        patientRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}

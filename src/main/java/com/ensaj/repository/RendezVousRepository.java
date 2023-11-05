package com.ensaj.repository;

import com.ensaj.domain.RendezVous;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the RendezVous entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RendezVousRepository extends MongoRepository<RendezVous, String> {}

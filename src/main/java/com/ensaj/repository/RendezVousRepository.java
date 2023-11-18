package com.ensaj.repository;

import com.ensaj.domain.Dermatologue;
import com.ensaj.domain.RendezVous;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the RendezVous entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RendezVousRepository extends MongoRepository<RendezVous, String> {
    List<RendezVous> findByDermatologues(Dermatologue dermatologueEntity);
}

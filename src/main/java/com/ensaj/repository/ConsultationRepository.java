package com.ensaj.repository;

import com.ensaj.domain.Consultation;
import java.time.Instant;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Consultation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConsultationRepository extends MongoRepository<Consultation, String> {
    @Query("{ 'dateConsultation' : { $gte: ?0, $lt: ?1 } }")
    List<Consultation> findConsultationsForToday(Instant debutAujourdhui, Instant debutDemain);
}

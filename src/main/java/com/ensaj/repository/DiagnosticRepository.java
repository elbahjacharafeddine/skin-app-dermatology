package com.ensaj.repository;

import com.ensaj.domain.Diagnostic;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Diagnostic entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DiagnosticRepository extends MongoRepository<Diagnostic, String> {}

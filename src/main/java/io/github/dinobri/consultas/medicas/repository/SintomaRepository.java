package io.github.dinobri.consultas.medicas.repository;

import io.github.dinobri.consultas.medicas.domain.Sintoma;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Sintoma entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SintomaRepository extends JpaRepository<Sintoma, Long> {

}

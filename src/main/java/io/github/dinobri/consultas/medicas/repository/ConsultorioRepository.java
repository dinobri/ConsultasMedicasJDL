package io.github.dinobri.consultas.medicas.repository;

import io.github.dinobri.consultas.medicas.domain.Consultorio;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Consultorio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConsultorioRepository extends JpaRepository<Consultorio, Long> {

}

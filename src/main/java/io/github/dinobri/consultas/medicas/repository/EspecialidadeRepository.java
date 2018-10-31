package io.github.dinobri.consultas.medicas.repository;

import io.github.dinobri.consultas.medicas.domain.Especialidade;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Especialidade entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EspecialidadeRepository extends JpaRepository<Especialidade, Long> {

}

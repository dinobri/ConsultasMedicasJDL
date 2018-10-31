package io.github.dinobri.consultas.medicas.repository;

import io.github.dinobri.consultas.medicas.domain.Posologia;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Posologia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PosologiaRepository extends JpaRepository<Posologia, Long> {

}

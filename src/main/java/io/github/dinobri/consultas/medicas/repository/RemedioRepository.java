package io.github.dinobri.consultas.medicas.repository;

import io.github.dinobri.consultas.medicas.domain.Remedio;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Remedio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RemedioRepository extends JpaRepository<Remedio, Long> {

}

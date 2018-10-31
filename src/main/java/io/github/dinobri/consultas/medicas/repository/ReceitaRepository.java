package io.github.dinobri.consultas.medicas.repository;

import io.github.dinobri.consultas.medicas.domain.Receita;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Receita entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReceitaRepository extends JpaRepository<Receita, Long> {

}

package io.github.dinobri.consultas.medicas.repository;

import io.github.dinobri.consultas.medicas.domain.AgendamentoConsulta;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AgendamentoConsulta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AgendamentoConsultaRepository extends JpaRepository<AgendamentoConsulta, Long> {

}

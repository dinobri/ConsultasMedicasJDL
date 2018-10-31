package io.github.dinobri.consultas.medicas.repository;

import io.github.dinobri.consultas.medicas.domain.Paciente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Paciente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    @Query(value = "select distinct paciente from Paciente paciente left join fetch paciente.doencas",
        countQuery = "select count(distinct paciente) from Paciente paciente")
    Page<Paciente> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct paciente from Paciente paciente left join fetch paciente.doencas")
    List<Paciente> findAllWithEagerRelationships();

    @Query("select paciente from Paciente paciente left join fetch paciente.doencas where paciente.id =:id")
    Optional<Paciente> findOneWithEagerRelationships(@Param("id") Long id);

}

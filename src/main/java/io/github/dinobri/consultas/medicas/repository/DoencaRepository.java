package io.github.dinobri.consultas.medicas.repository;

import io.github.dinobri.consultas.medicas.domain.Doenca;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Doenca entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DoencaRepository extends JpaRepository<Doenca, Long> {

    @Query(value = "select distinct doenca from Doenca doenca left join fetch doenca.sintomas",
        countQuery = "select count(distinct doenca) from Doenca doenca")
    Page<Doenca> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct doenca from Doenca doenca left join fetch doenca.sintomas")
    List<Doenca> findAllWithEagerRelationships();

    @Query("select doenca from Doenca doenca left join fetch doenca.sintomas where doenca.id =:id")
    Optional<Doenca> findOneWithEagerRelationships(@Param("id") Long id);

}

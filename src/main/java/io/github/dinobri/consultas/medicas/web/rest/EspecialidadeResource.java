package io.github.dinobri.consultas.medicas.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.dinobri.consultas.medicas.domain.Especialidade;
import io.github.dinobri.consultas.medicas.repository.EspecialidadeRepository;
import io.github.dinobri.consultas.medicas.web.rest.errors.BadRequestAlertException;
import io.github.dinobri.consultas.medicas.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Especialidade.
 */
@RestController
@RequestMapping("/api")
public class EspecialidadeResource {

    private final Logger log = LoggerFactory.getLogger(EspecialidadeResource.class);

    private static final String ENTITY_NAME = "especialidade";

    private EspecialidadeRepository especialidadeRepository;

    public EspecialidadeResource(EspecialidadeRepository especialidadeRepository) {
        this.especialidadeRepository = especialidadeRepository;
    }

    /**
     * POST  /especialidades : Create a new especialidade.
     *
     * @param especialidade the especialidade to create
     * @return the ResponseEntity with status 201 (Created) and with body the new especialidade, or with status 400 (Bad Request) if the especialidade has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/especialidades")
    @Timed
    public ResponseEntity<Especialidade> createEspecialidade(@RequestBody Especialidade especialidade) throws URISyntaxException {
        log.debug("REST request to save Especialidade : {}", especialidade);
        if (especialidade.getId() != null) {
            throw new BadRequestAlertException("A new especialidade cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Especialidade result = especialidadeRepository.save(especialidade);
        return ResponseEntity.created(new URI("/api/especialidades/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /especialidades : Updates an existing especialidade.
     *
     * @param especialidade the especialidade to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated especialidade,
     * or with status 400 (Bad Request) if the especialidade is not valid,
     * or with status 500 (Internal Server Error) if the especialidade couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/especialidades")
    @Timed
    public ResponseEntity<Especialidade> updateEspecialidade(@RequestBody Especialidade especialidade) throws URISyntaxException {
        log.debug("REST request to update Especialidade : {}", especialidade);
        if (especialidade.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Especialidade result = especialidadeRepository.save(especialidade);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, especialidade.getId().toString()))
            .body(result);
    }

    /**
     * GET  /especialidades : get all the especialidades.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of especialidades in body
     */
    @GetMapping("/especialidades")
    @Timed
    public List<Especialidade> getAllEspecialidades() {
        log.debug("REST request to get all Especialidades");
        return especialidadeRepository.findAll();
    }

    /**
     * GET  /especialidades/:id : get the "id" especialidade.
     *
     * @param id the id of the especialidade to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the especialidade, or with status 404 (Not Found)
     */
    @GetMapping("/especialidades/{id}")
    @Timed
    public ResponseEntity<Especialidade> getEspecialidade(@PathVariable Long id) {
        log.debug("REST request to get Especialidade : {}", id);
        Optional<Especialidade> especialidade = especialidadeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(especialidade);
    }

    /**
     * DELETE  /especialidades/:id : delete the "id" especialidade.
     *
     * @param id the id of the especialidade to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/especialidades/{id}")
    @Timed
    public ResponseEntity<Void> deleteEspecialidade(@PathVariable Long id) {
        log.debug("REST request to delete Especialidade : {}", id);

        especialidadeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

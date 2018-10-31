package io.github.dinobri.consultas.medicas.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.dinobri.consultas.medicas.domain.Medico;
import io.github.dinobri.consultas.medicas.repository.MedicoRepository;
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
 * REST controller for managing Medico.
 */
@RestController
@RequestMapping("/api")
public class MedicoResource {

    private final Logger log = LoggerFactory.getLogger(MedicoResource.class);

    private static final String ENTITY_NAME = "medico";

    private MedicoRepository medicoRepository;

    public MedicoResource(MedicoRepository medicoRepository) {
        this.medicoRepository = medicoRepository;
    }

    /**
     * POST  /medicos : Create a new medico.
     *
     * @param medico the medico to create
     * @return the ResponseEntity with status 201 (Created) and with body the new medico, or with status 400 (Bad Request) if the medico has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/medicos")
    @Timed
    public ResponseEntity<Medico> createMedico(@RequestBody Medico medico) throws URISyntaxException {
        log.debug("REST request to save Medico : {}", medico);
        if (medico.getId() != null) {
            throw new BadRequestAlertException("A new medico cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Medico result = medicoRepository.save(medico);
        return ResponseEntity.created(new URI("/api/medicos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /medicos : Updates an existing medico.
     *
     * @param medico the medico to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated medico,
     * or with status 400 (Bad Request) if the medico is not valid,
     * or with status 500 (Internal Server Error) if the medico couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/medicos")
    @Timed
    public ResponseEntity<Medico> updateMedico(@RequestBody Medico medico) throws URISyntaxException {
        log.debug("REST request to update Medico : {}", medico);
        if (medico.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Medico result = medicoRepository.save(medico);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, medico.getId().toString()))
            .body(result);
    }

    /**
     * GET  /medicos : get all the medicos.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of medicos in body
     */
    @GetMapping("/medicos")
    @Timed
    public List<Medico> getAllMedicos(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Medicos");
        return medicoRepository.findAllWithEagerRelationships();
    }

    /**
     * GET  /medicos/:id : get the "id" medico.
     *
     * @param id the id of the medico to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the medico, or with status 404 (Not Found)
     */
    @GetMapping("/medicos/{id}")
    @Timed
    public ResponseEntity<Medico> getMedico(@PathVariable Long id) {
        log.debug("REST request to get Medico : {}", id);
        Optional<Medico> medico = medicoRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(medico);
    }

    /**
     * DELETE  /medicos/:id : delete the "id" medico.
     *
     * @param id the id of the medico to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/medicos/{id}")
    @Timed
    public ResponseEntity<Void> deleteMedico(@PathVariable Long id) {
        log.debug("REST request to delete Medico : {}", id);

        medicoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

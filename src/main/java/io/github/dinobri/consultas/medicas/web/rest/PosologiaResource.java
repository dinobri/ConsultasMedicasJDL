package io.github.dinobri.consultas.medicas.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.dinobri.consultas.medicas.domain.Posologia;
import io.github.dinobri.consultas.medicas.repository.PosologiaRepository;
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
 * REST controller for managing Posologia.
 */
@RestController
@RequestMapping("/api")
public class PosologiaResource {

    private final Logger log = LoggerFactory.getLogger(PosologiaResource.class);

    private static final String ENTITY_NAME = "posologia";

    private PosologiaRepository posologiaRepository;

    public PosologiaResource(PosologiaRepository posologiaRepository) {
        this.posologiaRepository = posologiaRepository;
    }

    /**
     * POST  /posologias : Create a new posologia.
     *
     * @param posologia the posologia to create
     * @return the ResponseEntity with status 201 (Created) and with body the new posologia, or with status 400 (Bad Request) if the posologia has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/posologias")
    @Timed
    public ResponseEntity<Posologia> createPosologia(@RequestBody Posologia posologia) throws URISyntaxException {
        log.debug("REST request to save Posologia : {}", posologia);
        if (posologia.getId() != null) {
            throw new BadRequestAlertException("A new posologia cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Posologia result = posologiaRepository.save(posologia);
        return ResponseEntity.created(new URI("/api/posologias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /posologias : Updates an existing posologia.
     *
     * @param posologia the posologia to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated posologia,
     * or with status 400 (Bad Request) if the posologia is not valid,
     * or with status 500 (Internal Server Error) if the posologia couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/posologias")
    @Timed
    public ResponseEntity<Posologia> updatePosologia(@RequestBody Posologia posologia) throws URISyntaxException {
        log.debug("REST request to update Posologia : {}", posologia);
        if (posologia.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Posologia result = posologiaRepository.save(posologia);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, posologia.getId().toString()))
            .body(result);
    }

    /**
     * GET  /posologias : get all the posologias.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of posologias in body
     */
    @GetMapping("/posologias")
    @Timed
    public List<Posologia> getAllPosologias() {
        log.debug("REST request to get all Posologias");
        return posologiaRepository.findAll();
    }

    /**
     * GET  /posologias/:id : get the "id" posologia.
     *
     * @param id the id of the posologia to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the posologia, or with status 404 (Not Found)
     */
    @GetMapping("/posologias/{id}")
    @Timed
    public ResponseEntity<Posologia> getPosologia(@PathVariable Long id) {
        log.debug("REST request to get Posologia : {}", id);
        Optional<Posologia> posologia = posologiaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(posologia);
    }

    /**
     * DELETE  /posologias/:id : delete the "id" posologia.
     *
     * @param id the id of the posologia to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/posologias/{id}")
    @Timed
    public ResponseEntity<Void> deletePosologia(@PathVariable Long id) {
        log.debug("REST request to delete Posologia : {}", id);

        posologiaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

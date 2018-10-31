package io.github.dinobri.consultas.medicas.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.dinobri.consultas.medicas.domain.Sintoma;
import io.github.dinobri.consultas.medicas.repository.SintomaRepository;
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
 * REST controller for managing Sintoma.
 */
@RestController
@RequestMapping("/api")
public class SintomaResource {

    private final Logger log = LoggerFactory.getLogger(SintomaResource.class);

    private static final String ENTITY_NAME = "sintoma";

    private SintomaRepository sintomaRepository;

    public SintomaResource(SintomaRepository sintomaRepository) {
        this.sintomaRepository = sintomaRepository;
    }

    /**
     * POST  /sintomas : Create a new sintoma.
     *
     * @param sintoma the sintoma to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sintoma, or with status 400 (Bad Request) if the sintoma has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sintomas")
    @Timed
    public ResponseEntity<Sintoma> createSintoma(@RequestBody Sintoma sintoma) throws URISyntaxException {
        log.debug("REST request to save Sintoma : {}", sintoma);
        if (sintoma.getId() != null) {
            throw new BadRequestAlertException("A new sintoma cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Sintoma result = sintomaRepository.save(sintoma);
        return ResponseEntity.created(new URI("/api/sintomas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sintomas : Updates an existing sintoma.
     *
     * @param sintoma the sintoma to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sintoma,
     * or with status 400 (Bad Request) if the sintoma is not valid,
     * or with status 500 (Internal Server Error) if the sintoma couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sintomas")
    @Timed
    public ResponseEntity<Sintoma> updateSintoma(@RequestBody Sintoma sintoma) throws URISyntaxException {
        log.debug("REST request to update Sintoma : {}", sintoma);
        if (sintoma.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Sintoma result = sintomaRepository.save(sintoma);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sintoma.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sintomas : get all the sintomas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sintomas in body
     */
    @GetMapping("/sintomas")
    @Timed
    public List<Sintoma> getAllSintomas() {
        log.debug("REST request to get all Sintomas");
        return sintomaRepository.findAll();
    }

    /**
     * GET  /sintomas/:id : get the "id" sintoma.
     *
     * @param id the id of the sintoma to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sintoma, or with status 404 (Not Found)
     */
    @GetMapping("/sintomas/{id}")
    @Timed
    public ResponseEntity<Sintoma> getSintoma(@PathVariable Long id) {
        log.debug("REST request to get Sintoma : {}", id);
        Optional<Sintoma> sintoma = sintomaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sintoma);
    }

    /**
     * DELETE  /sintomas/:id : delete the "id" sintoma.
     *
     * @param id the id of the sintoma to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sintomas/{id}")
    @Timed
    public ResponseEntity<Void> deleteSintoma(@PathVariable Long id) {
        log.debug("REST request to delete Sintoma : {}", id);

        sintomaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

package io.github.dinobri.consultas.medicas.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.dinobri.consultas.medicas.domain.Remedio;
import io.github.dinobri.consultas.medicas.repository.RemedioRepository;
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
 * REST controller for managing Remedio.
 */
@RestController
@RequestMapping("/api")
public class RemedioResource {

    private final Logger log = LoggerFactory.getLogger(RemedioResource.class);

    private static final String ENTITY_NAME = "remedio";

    private RemedioRepository remedioRepository;

    public RemedioResource(RemedioRepository remedioRepository) {
        this.remedioRepository = remedioRepository;
    }

    /**
     * POST  /remedios : Create a new remedio.
     *
     * @param remedio the remedio to create
     * @return the ResponseEntity with status 201 (Created) and with body the new remedio, or with status 400 (Bad Request) if the remedio has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/remedios")
    @Timed
    public ResponseEntity<Remedio> createRemedio(@RequestBody Remedio remedio) throws URISyntaxException {
        log.debug("REST request to save Remedio : {}", remedio);
        if (remedio.getId() != null) {
            throw new BadRequestAlertException("A new remedio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Remedio result = remedioRepository.save(remedio);
        return ResponseEntity.created(new URI("/api/remedios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /remedios : Updates an existing remedio.
     *
     * @param remedio the remedio to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated remedio,
     * or with status 400 (Bad Request) if the remedio is not valid,
     * or with status 500 (Internal Server Error) if the remedio couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/remedios")
    @Timed
    public ResponseEntity<Remedio> updateRemedio(@RequestBody Remedio remedio) throws URISyntaxException {
        log.debug("REST request to update Remedio : {}", remedio);
        if (remedio.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Remedio result = remedioRepository.save(remedio);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, remedio.getId().toString()))
            .body(result);
    }

    /**
     * GET  /remedios : get all the remedios.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of remedios in body
     */
    @GetMapping("/remedios")
    @Timed
    public List<Remedio> getAllRemedios() {
        log.debug("REST request to get all Remedios");
        return remedioRepository.findAll();
    }

    /**
     * GET  /remedios/:id : get the "id" remedio.
     *
     * @param id the id of the remedio to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the remedio, or with status 404 (Not Found)
     */
    @GetMapping("/remedios/{id}")
    @Timed
    public ResponseEntity<Remedio> getRemedio(@PathVariable Long id) {
        log.debug("REST request to get Remedio : {}", id);
        Optional<Remedio> remedio = remedioRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(remedio);
    }

    /**
     * DELETE  /remedios/:id : delete the "id" remedio.
     *
     * @param id the id of the remedio to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/remedios/{id}")
    @Timed
    public ResponseEntity<Void> deleteRemedio(@PathVariable Long id) {
        log.debug("REST request to delete Remedio : {}", id);

        remedioRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

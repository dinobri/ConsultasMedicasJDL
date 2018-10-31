package io.github.dinobri.consultas.medicas.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.dinobri.consultas.medicas.domain.Receita;
import io.github.dinobri.consultas.medicas.repository.ReceitaRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing Receita.
 */
@RestController
@RequestMapping("/api")
public class ReceitaResource {

    private final Logger log = LoggerFactory.getLogger(ReceitaResource.class);

    private static final String ENTITY_NAME = "receita";

    private ReceitaRepository receitaRepository;

    public ReceitaResource(ReceitaRepository receitaRepository) {
        this.receitaRepository = receitaRepository;
    }

    /**
     * POST  /receitas : Create a new receita.
     *
     * @param receita the receita to create
     * @return the ResponseEntity with status 201 (Created) and with body the new receita, or with status 400 (Bad Request) if the receita has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/receitas")
    @Timed
    public ResponseEntity<Receita> createReceita(@RequestBody Receita receita) throws URISyntaxException {
        log.debug("REST request to save Receita : {}", receita);
        if (receita.getId() != null) {
            throw new BadRequestAlertException("A new receita cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Receita result = receitaRepository.save(receita);
        return ResponseEntity.created(new URI("/api/receitas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /receitas : Updates an existing receita.
     *
     * @param receita the receita to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated receita,
     * or with status 400 (Bad Request) if the receita is not valid,
     * or with status 500 (Internal Server Error) if the receita couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/receitas")
    @Timed
    public ResponseEntity<Receita> updateReceita(@RequestBody Receita receita) throws URISyntaxException {
        log.debug("REST request to update Receita : {}", receita);
        if (receita.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Receita result = receitaRepository.save(receita);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, receita.getId().toString()))
            .body(result);
    }

    /**
     * GET  /receitas : get all the receitas.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of receitas in body
     */
    @GetMapping("/receitas")
    @Timed
    public List<Receita> getAllReceitas(@RequestParam(required = false) String filter) {
        if ("consulta-is-null".equals(filter)) {
            log.debug("REST request to get all Receitas where consulta is null");
            return StreamSupport
                .stream(receitaRepository.findAll().spliterator(), false)
                .filter(receita -> receita.getConsulta() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Receitas");
        return receitaRepository.findAll();
    }

    /**
     * GET  /receitas/:id : get the "id" receita.
     *
     * @param id the id of the receita to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the receita, or with status 404 (Not Found)
     */
    @GetMapping("/receitas/{id}")
    @Timed
    public ResponseEntity<Receita> getReceita(@PathVariable Long id) {
        log.debug("REST request to get Receita : {}", id);
        Optional<Receita> receita = receitaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(receita);
    }

    /**
     * DELETE  /receitas/:id : delete the "id" receita.
     *
     * @param id the id of the receita to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/receitas/{id}")
    @Timed
    public ResponseEntity<Void> deleteReceita(@PathVariable Long id) {
        log.debug("REST request to delete Receita : {}", id);

        receitaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

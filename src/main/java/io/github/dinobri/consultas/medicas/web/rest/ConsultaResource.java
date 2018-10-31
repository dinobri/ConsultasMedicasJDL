package io.github.dinobri.consultas.medicas.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.dinobri.consultas.medicas.domain.Consulta;
import io.github.dinobri.consultas.medicas.repository.ConsultaRepository;
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
 * REST controller for managing Consulta.
 */
@RestController
@RequestMapping("/api")
public class ConsultaResource {

    private final Logger log = LoggerFactory.getLogger(ConsultaResource.class);

    private static final String ENTITY_NAME = "consulta";

    private ConsultaRepository consultaRepository;

    public ConsultaResource(ConsultaRepository consultaRepository) {
        this.consultaRepository = consultaRepository;
    }

    /**
     * POST  /consultas : Create a new consulta.
     *
     * @param consulta the consulta to create
     * @return the ResponseEntity with status 201 (Created) and with body the new consulta, or with status 400 (Bad Request) if the consulta has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/consultas")
    @Timed
    public ResponseEntity<Consulta> createConsulta(@RequestBody Consulta consulta) throws URISyntaxException {
        log.debug("REST request to save Consulta : {}", consulta);
        if (consulta.getId() != null) {
            throw new BadRequestAlertException("A new consulta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Consulta result = consultaRepository.save(consulta);
        return ResponseEntity.created(new URI("/api/consultas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /consultas : Updates an existing consulta.
     *
     * @param consulta the consulta to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated consulta,
     * or with status 400 (Bad Request) if the consulta is not valid,
     * or with status 500 (Internal Server Error) if the consulta couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/consultas")
    @Timed
    public ResponseEntity<Consulta> updateConsulta(@RequestBody Consulta consulta) throws URISyntaxException {
        log.debug("REST request to update Consulta : {}", consulta);
        if (consulta.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Consulta result = consultaRepository.save(consulta);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, consulta.getId().toString()))
            .body(result);
    }

    /**
     * GET  /consultas : get all the consultas.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of consultas in body
     */
    @GetMapping("/consultas")
    @Timed
    public List<Consulta> getAllConsultas(@RequestParam(required = false) String filter) {
        if ("agendamentoconsulta-is-null".equals(filter)) {
            log.debug("REST request to get all Consultas where agendamentoConsulta is null");
            return StreamSupport
                .stream(consultaRepository.findAll().spliterator(), false)
                .filter(consulta -> consulta.getAgendamentoConsulta() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Consultas");
        return consultaRepository.findAll();
    }

    /**
     * GET  /consultas/:id : get the "id" consulta.
     *
     * @param id the id of the consulta to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the consulta, or with status 404 (Not Found)
     */
    @GetMapping("/consultas/{id}")
    @Timed
    public ResponseEntity<Consulta> getConsulta(@PathVariable Long id) {
        log.debug("REST request to get Consulta : {}", id);
        Optional<Consulta> consulta = consultaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(consulta);
    }

    /**
     * DELETE  /consultas/:id : delete the "id" consulta.
     *
     * @param id the id of the consulta to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/consultas/{id}")
    @Timed
    public ResponseEntity<Void> deleteConsulta(@PathVariable Long id) {
        log.debug("REST request to delete Consulta : {}", id);

        consultaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

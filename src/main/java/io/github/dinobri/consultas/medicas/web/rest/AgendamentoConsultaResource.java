package io.github.dinobri.consultas.medicas.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.dinobri.consultas.medicas.domain.AgendamentoConsulta;
import io.github.dinobri.consultas.medicas.repository.AgendamentoConsultaRepository;
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
 * REST controller for managing AgendamentoConsulta.
 */
@RestController
@RequestMapping("/api")
public class AgendamentoConsultaResource {

    private final Logger log = LoggerFactory.getLogger(AgendamentoConsultaResource.class);

    private static final String ENTITY_NAME = "agendamentoConsulta";

    private AgendamentoConsultaRepository agendamentoConsultaRepository;

    public AgendamentoConsultaResource(AgendamentoConsultaRepository agendamentoConsultaRepository) {
        this.agendamentoConsultaRepository = agendamentoConsultaRepository;
    }

    /**
     * POST  /agendamento-consultas : Create a new agendamentoConsulta.
     *
     * @param agendamentoConsulta the agendamentoConsulta to create
     * @return the ResponseEntity with status 201 (Created) and with body the new agendamentoConsulta, or with status 400 (Bad Request) if the agendamentoConsulta has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/agendamento-consultas")
    @Timed
    public ResponseEntity<AgendamentoConsulta> createAgendamentoConsulta(@RequestBody AgendamentoConsulta agendamentoConsulta) throws URISyntaxException {
        log.debug("REST request to save AgendamentoConsulta : {}", agendamentoConsulta);
        if (agendamentoConsulta.getId() != null) {
            throw new BadRequestAlertException("A new agendamentoConsulta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AgendamentoConsulta result = agendamentoConsultaRepository.save(agendamentoConsulta);
        return ResponseEntity.created(new URI("/api/agendamento-consultas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /agendamento-consultas : Updates an existing agendamentoConsulta.
     *
     * @param agendamentoConsulta the agendamentoConsulta to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated agendamentoConsulta,
     * or with status 400 (Bad Request) if the agendamentoConsulta is not valid,
     * or with status 500 (Internal Server Error) if the agendamentoConsulta couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/agendamento-consultas")
    @Timed
    public ResponseEntity<AgendamentoConsulta> updateAgendamentoConsulta(@RequestBody AgendamentoConsulta agendamentoConsulta) throws URISyntaxException {
        log.debug("REST request to update AgendamentoConsulta : {}", agendamentoConsulta);
        if (agendamentoConsulta.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AgendamentoConsulta result = agendamentoConsultaRepository.save(agendamentoConsulta);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, agendamentoConsulta.getId().toString()))
            .body(result);
    }

    /**
     * GET  /agendamento-consultas : get all the agendamentoConsultas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of agendamentoConsultas in body
     */
    @GetMapping("/agendamento-consultas")
    @Timed
    public List<AgendamentoConsulta> getAllAgendamentoConsultas() {
        log.debug("REST request to get all AgendamentoConsultas");
        return agendamentoConsultaRepository.findAll();
    }

    /**
     * GET  /agendamento-consultas/:id : get the "id" agendamentoConsulta.
     *
     * @param id the id of the agendamentoConsulta to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the agendamentoConsulta, or with status 404 (Not Found)
     */
    @GetMapping("/agendamento-consultas/{id}")
    @Timed
    public ResponseEntity<AgendamentoConsulta> getAgendamentoConsulta(@PathVariable Long id) {
        log.debug("REST request to get AgendamentoConsulta : {}", id);
        Optional<AgendamentoConsulta> agendamentoConsulta = agendamentoConsultaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(agendamentoConsulta);
    }

    /**
     * DELETE  /agendamento-consultas/:id : delete the "id" agendamentoConsulta.
     *
     * @param id the id of the agendamentoConsulta to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/agendamento-consultas/{id}")
    @Timed
    public ResponseEntity<Void> deleteAgendamentoConsulta(@PathVariable Long id) {
        log.debug("REST request to delete AgendamentoConsulta : {}", id);

        agendamentoConsultaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}

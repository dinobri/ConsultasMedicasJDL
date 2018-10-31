package io.github.dinobri.consultas.medicas.web.rest;

import io.github.dinobri.consultas.medicas.ConsultasMedicasJdlApp;

import io.github.dinobri.consultas.medicas.domain.AgendamentoConsulta;
import io.github.dinobri.consultas.medicas.repository.AgendamentoConsultaRepository;
import io.github.dinobri.consultas.medicas.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static io.github.dinobri.consultas.medicas.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AgendamentoConsultaResource REST controller.
 *
 * @see AgendamentoConsultaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ConsultasMedicasJdlApp.class)
public class AgendamentoConsultaResourceIntTest {

    private static final LocalDate DEFAULT_DATA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_HORA_INICIO = 1;
    private static final Integer UPDATED_HORA_INICIO = 2;

    private static final Integer DEFAULT_HORA_FIM = 1;
    private static final Integer UPDATED_HORA_FIM = 2;

    private static final Boolean DEFAULT_IS_HORA_MARCADA = false;
    private static final Boolean UPDATED_IS_HORA_MARCADA = true;

    @Autowired
    private AgendamentoConsultaRepository agendamentoConsultaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAgendamentoConsultaMockMvc;

    private AgendamentoConsulta agendamentoConsulta;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AgendamentoConsultaResource agendamentoConsultaResource = new AgendamentoConsultaResource(agendamentoConsultaRepository);
        this.restAgendamentoConsultaMockMvc = MockMvcBuilders.standaloneSetup(agendamentoConsultaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AgendamentoConsulta createEntity(EntityManager em) {
        AgendamentoConsulta agendamentoConsulta = new AgendamentoConsulta()
            .data(DEFAULT_DATA)
            .horaInicio(DEFAULT_HORA_INICIO)
            .horaFim(DEFAULT_HORA_FIM)
            .isHoraMarcada(DEFAULT_IS_HORA_MARCADA);
        return agendamentoConsulta;
    }

    @Before
    public void initTest() {
        agendamentoConsulta = createEntity(em);
    }

    @Test
    @Transactional
    public void createAgendamentoConsulta() throws Exception {
        int databaseSizeBeforeCreate = agendamentoConsultaRepository.findAll().size();

        // Create the AgendamentoConsulta
        restAgendamentoConsultaMockMvc.perform(post("/api/agendamento-consultas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agendamentoConsulta)))
            .andExpect(status().isCreated());

        // Validate the AgendamentoConsulta in the database
        List<AgendamentoConsulta> agendamentoConsultaList = agendamentoConsultaRepository.findAll();
        assertThat(agendamentoConsultaList).hasSize(databaseSizeBeforeCreate + 1);
        AgendamentoConsulta testAgendamentoConsulta = agendamentoConsultaList.get(agendamentoConsultaList.size() - 1);
        assertThat(testAgendamentoConsulta.getData()).isEqualTo(DEFAULT_DATA);
        assertThat(testAgendamentoConsulta.getHoraInicio()).isEqualTo(DEFAULT_HORA_INICIO);
        assertThat(testAgendamentoConsulta.getHoraFim()).isEqualTo(DEFAULT_HORA_FIM);
        assertThat(testAgendamentoConsulta.isIsHoraMarcada()).isEqualTo(DEFAULT_IS_HORA_MARCADA);
    }

    @Test
    @Transactional
    public void createAgendamentoConsultaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = agendamentoConsultaRepository.findAll().size();

        // Create the AgendamentoConsulta with an existing ID
        agendamentoConsulta.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAgendamentoConsultaMockMvc.perform(post("/api/agendamento-consultas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agendamentoConsulta)))
            .andExpect(status().isBadRequest());

        // Validate the AgendamentoConsulta in the database
        List<AgendamentoConsulta> agendamentoConsultaList = agendamentoConsultaRepository.findAll();
        assertThat(agendamentoConsultaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAgendamentoConsultas() throws Exception {
        // Initialize the database
        agendamentoConsultaRepository.saveAndFlush(agendamentoConsulta);

        // Get all the agendamentoConsultaList
        restAgendamentoConsultaMockMvc.perform(get("/api/agendamento-consultas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(agendamentoConsulta.getId().intValue())))
            .andExpect(jsonPath("$.[*].data").value(hasItem(DEFAULT_DATA.toString())))
            .andExpect(jsonPath("$.[*].horaInicio").value(hasItem(DEFAULT_HORA_INICIO)))
            .andExpect(jsonPath("$.[*].horaFim").value(hasItem(DEFAULT_HORA_FIM)))
            .andExpect(jsonPath("$.[*].isHoraMarcada").value(hasItem(DEFAULT_IS_HORA_MARCADA.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getAgendamentoConsulta() throws Exception {
        // Initialize the database
        agendamentoConsultaRepository.saveAndFlush(agendamentoConsulta);

        // Get the agendamentoConsulta
        restAgendamentoConsultaMockMvc.perform(get("/api/agendamento-consultas/{id}", agendamentoConsulta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(agendamentoConsulta.getId().intValue()))
            .andExpect(jsonPath("$.data").value(DEFAULT_DATA.toString()))
            .andExpect(jsonPath("$.horaInicio").value(DEFAULT_HORA_INICIO))
            .andExpect(jsonPath("$.horaFim").value(DEFAULT_HORA_FIM))
            .andExpect(jsonPath("$.isHoraMarcada").value(DEFAULT_IS_HORA_MARCADA.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAgendamentoConsulta() throws Exception {
        // Get the agendamentoConsulta
        restAgendamentoConsultaMockMvc.perform(get("/api/agendamento-consultas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAgendamentoConsulta() throws Exception {
        // Initialize the database
        agendamentoConsultaRepository.saveAndFlush(agendamentoConsulta);

        int databaseSizeBeforeUpdate = agendamentoConsultaRepository.findAll().size();

        // Update the agendamentoConsulta
        AgendamentoConsulta updatedAgendamentoConsulta = agendamentoConsultaRepository.findById(agendamentoConsulta.getId()).get();
        // Disconnect from session so that the updates on updatedAgendamentoConsulta are not directly saved in db
        em.detach(updatedAgendamentoConsulta);
        updatedAgendamentoConsulta
            .data(UPDATED_DATA)
            .horaInicio(UPDATED_HORA_INICIO)
            .horaFim(UPDATED_HORA_FIM)
            .isHoraMarcada(UPDATED_IS_HORA_MARCADA);

        restAgendamentoConsultaMockMvc.perform(put("/api/agendamento-consultas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAgendamentoConsulta)))
            .andExpect(status().isOk());

        // Validate the AgendamentoConsulta in the database
        List<AgendamentoConsulta> agendamentoConsultaList = agendamentoConsultaRepository.findAll();
        assertThat(agendamentoConsultaList).hasSize(databaseSizeBeforeUpdate);
        AgendamentoConsulta testAgendamentoConsulta = agendamentoConsultaList.get(agendamentoConsultaList.size() - 1);
        assertThat(testAgendamentoConsulta.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testAgendamentoConsulta.getHoraInicio()).isEqualTo(UPDATED_HORA_INICIO);
        assertThat(testAgendamentoConsulta.getHoraFim()).isEqualTo(UPDATED_HORA_FIM);
        assertThat(testAgendamentoConsulta.isIsHoraMarcada()).isEqualTo(UPDATED_IS_HORA_MARCADA);
    }

    @Test
    @Transactional
    public void updateNonExistingAgendamentoConsulta() throws Exception {
        int databaseSizeBeforeUpdate = agendamentoConsultaRepository.findAll().size();

        // Create the AgendamentoConsulta

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAgendamentoConsultaMockMvc.perform(put("/api/agendamento-consultas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agendamentoConsulta)))
            .andExpect(status().isBadRequest());

        // Validate the AgendamentoConsulta in the database
        List<AgendamentoConsulta> agendamentoConsultaList = agendamentoConsultaRepository.findAll();
        assertThat(agendamentoConsultaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAgendamentoConsulta() throws Exception {
        // Initialize the database
        agendamentoConsultaRepository.saveAndFlush(agendamentoConsulta);

        int databaseSizeBeforeDelete = agendamentoConsultaRepository.findAll().size();

        // Get the agendamentoConsulta
        restAgendamentoConsultaMockMvc.perform(delete("/api/agendamento-consultas/{id}", agendamentoConsulta.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AgendamentoConsulta> agendamentoConsultaList = agendamentoConsultaRepository.findAll();
        assertThat(agendamentoConsultaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AgendamentoConsulta.class);
        AgendamentoConsulta agendamentoConsulta1 = new AgendamentoConsulta();
        agendamentoConsulta1.setId(1L);
        AgendamentoConsulta agendamentoConsulta2 = new AgendamentoConsulta();
        agendamentoConsulta2.setId(agendamentoConsulta1.getId());
        assertThat(agendamentoConsulta1).isEqualTo(agendamentoConsulta2);
        agendamentoConsulta2.setId(2L);
        assertThat(agendamentoConsulta1).isNotEqualTo(agendamentoConsulta2);
        agendamentoConsulta1.setId(null);
        assertThat(agendamentoConsulta1).isNotEqualTo(agendamentoConsulta2);
    }
}

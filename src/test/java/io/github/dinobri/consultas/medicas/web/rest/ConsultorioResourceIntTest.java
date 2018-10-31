package io.github.dinobri.consultas.medicas.web.rest;

import io.github.dinobri.consultas.medicas.ConsultasMedicasJdlApp;

import io.github.dinobri.consultas.medicas.domain.Consultorio;
import io.github.dinobri.consultas.medicas.repository.ConsultorioRepository;
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
import java.util.List;


import static io.github.dinobri.consultas.medicas.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ConsultorioResource REST controller.
 *
 * @see ConsultorioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ConsultasMedicasJdlApp.class)
public class ConsultorioResourceIntTest {

    private static final Integer DEFAULT_NUMERO = 1;
    private static final Integer UPDATED_NUMERO = 2;

    @Autowired
    private ConsultorioRepository consultorioRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restConsultorioMockMvc;

    private Consultorio consultorio;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ConsultorioResource consultorioResource = new ConsultorioResource(consultorioRepository);
        this.restConsultorioMockMvc = MockMvcBuilders.standaloneSetup(consultorioResource)
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
    public static Consultorio createEntity(EntityManager em) {
        Consultorio consultorio = new Consultorio()
            .numero(DEFAULT_NUMERO);
        return consultorio;
    }

    @Before
    public void initTest() {
        consultorio = createEntity(em);
    }

    @Test
    @Transactional
    public void createConsultorio() throws Exception {
        int databaseSizeBeforeCreate = consultorioRepository.findAll().size();

        // Create the Consultorio
        restConsultorioMockMvc.perform(post("/api/consultorios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consultorio)))
            .andExpect(status().isCreated());

        // Validate the Consultorio in the database
        List<Consultorio> consultorioList = consultorioRepository.findAll();
        assertThat(consultorioList).hasSize(databaseSizeBeforeCreate + 1);
        Consultorio testConsultorio = consultorioList.get(consultorioList.size() - 1);
        assertThat(testConsultorio.getNumero()).isEqualTo(DEFAULT_NUMERO);
    }

    @Test
    @Transactional
    public void createConsultorioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = consultorioRepository.findAll().size();

        // Create the Consultorio with an existing ID
        consultorio.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConsultorioMockMvc.perform(post("/api/consultorios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consultorio)))
            .andExpect(status().isBadRequest());

        // Validate the Consultorio in the database
        List<Consultorio> consultorioList = consultorioRepository.findAll();
        assertThat(consultorioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllConsultorios() throws Exception {
        // Initialize the database
        consultorioRepository.saveAndFlush(consultorio);

        // Get all the consultorioList
        restConsultorioMockMvc.perform(get("/api/consultorios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(consultorio.getId().intValue())))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO)));
    }
    
    @Test
    @Transactional
    public void getConsultorio() throws Exception {
        // Initialize the database
        consultorioRepository.saveAndFlush(consultorio);

        // Get the consultorio
        restConsultorioMockMvc.perform(get("/api/consultorios/{id}", consultorio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(consultorio.getId().intValue()))
            .andExpect(jsonPath("$.numero").value(DEFAULT_NUMERO));
    }

    @Test
    @Transactional
    public void getNonExistingConsultorio() throws Exception {
        // Get the consultorio
        restConsultorioMockMvc.perform(get("/api/consultorios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConsultorio() throws Exception {
        // Initialize the database
        consultorioRepository.saveAndFlush(consultorio);

        int databaseSizeBeforeUpdate = consultorioRepository.findAll().size();

        // Update the consultorio
        Consultorio updatedConsultorio = consultorioRepository.findById(consultorio.getId()).get();
        // Disconnect from session so that the updates on updatedConsultorio are not directly saved in db
        em.detach(updatedConsultorio);
        updatedConsultorio
            .numero(UPDATED_NUMERO);

        restConsultorioMockMvc.perform(put("/api/consultorios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedConsultorio)))
            .andExpect(status().isOk());

        // Validate the Consultorio in the database
        List<Consultorio> consultorioList = consultorioRepository.findAll();
        assertThat(consultorioList).hasSize(databaseSizeBeforeUpdate);
        Consultorio testConsultorio = consultorioList.get(consultorioList.size() - 1);
        assertThat(testConsultorio.getNumero()).isEqualTo(UPDATED_NUMERO);
    }

    @Test
    @Transactional
    public void updateNonExistingConsultorio() throws Exception {
        int databaseSizeBeforeUpdate = consultorioRepository.findAll().size();

        // Create the Consultorio

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConsultorioMockMvc.perform(put("/api/consultorios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consultorio)))
            .andExpect(status().isBadRequest());

        // Validate the Consultorio in the database
        List<Consultorio> consultorioList = consultorioRepository.findAll();
        assertThat(consultorioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteConsultorio() throws Exception {
        // Initialize the database
        consultorioRepository.saveAndFlush(consultorio);

        int databaseSizeBeforeDelete = consultorioRepository.findAll().size();

        // Get the consultorio
        restConsultorioMockMvc.perform(delete("/api/consultorios/{id}", consultorio.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Consultorio> consultorioList = consultorioRepository.findAll();
        assertThat(consultorioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Consultorio.class);
        Consultorio consultorio1 = new Consultorio();
        consultorio1.setId(1L);
        Consultorio consultorio2 = new Consultorio();
        consultorio2.setId(consultorio1.getId());
        assertThat(consultorio1).isEqualTo(consultorio2);
        consultorio2.setId(2L);
        assertThat(consultorio1).isNotEqualTo(consultorio2);
        consultorio1.setId(null);
        assertThat(consultorio1).isNotEqualTo(consultorio2);
    }
}

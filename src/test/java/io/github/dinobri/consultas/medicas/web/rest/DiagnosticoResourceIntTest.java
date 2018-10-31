package io.github.dinobri.consultas.medicas.web.rest;

import io.github.dinobri.consultas.medicas.ConsultasMedicasJdlApp;

import io.github.dinobri.consultas.medicas.domain.Diagnostico;
import io.github.dinobri.consultas.medicas.repository.DiagnosticoRepository;
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
 * Test class for the DiagnosticoResource REST controller.
 *
 * @see DiagnosticoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ConsultasMedicasJdlApp.class)
public class DiagnosticoResourceIntTest {

    @Autowired
    private DiagnosticoRepository diagnosticoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDiagnosticoMockMvc;

    private Diagnostico diagnostico;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DiagnosticoResource diagnosticoResource = new DiagnosticoResource(diagnosticoRepository);
        this.restDiagnosticoMockMvc = MockMvcBuilders.standaloneSetup(diagnosticoResource)
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
    public static Diagnostico createEntity(EntityManager em) {
        Diagnostico diagnostico = new Diagnostico();
        return diagnostico;
    }

    @Before
    public void initTest() {
        diagnostico = createEntity(em);
    }

    @Test
    @Transactional
    public void createDiagnostico() throws Exception {
        int databaseSizeBeforeCreate = diagnosticoRepository.findAll().size();

        // Create the Diagnostico
        restDiagnosticoMockMvc.perform(post("/api/diagnosticos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(diagnostico)))
            .andExpect(status().isCreated());

        // Validate the Diagnostico in the database
        List<Diagnostico> diagnosticoList = diagnosticoRepository.findAll();
        assertThat(diagnosticoList).hasSize(databaseSizeBeforeCreate + 1);
        Diagnostico testDiagnostico = diagnosticoList.get(diagnosticoList.size() - 1);
    }

    @Test
    @Transactional
    public void createDiagnosticoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = diagnosticoRepository.findAll().size();

        // Create the Diagnostico with an existing ID
        diagnostico.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDiagnosticoMockMvc.perform(post("/api/diagnosticos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(diagnostico)))
            .andExpect(status().isBadRequest());

        // Validate the Diagnostico in the database
        List<Diagnostico> diagnosticoList = diagnosticoRepository.findAll();
        assertThat(diagnosticoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDiagnosticos() throws Exception {
        // Initialize the database
        diagnosticoRepository.saveAndFlush(diagnostico);

        // Get all the diagnosticoList
        restDiagnosticoMockMvc.perform(get("/api/diagnosticos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(diagnostico.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getDiagnostico() throws Exception {
        // Initialize the database
        diagnosticoRepository.saveAndFlush(diagnostico);

        // Get the diagnostico
        restDiagnosticoMockMvc.perform(get("/api/diagnosticos/{id}", diagnostico.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(diagnostico.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingDiagnostico() throws Exception {
        // Get the diagnostico
        restDiagnosticoMockMvc.perform(get("/api/diagnosticos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDiagnostico() throws Exception {
        // Initialize the database
        diagnosticoRepository.saveAndFlush(diagnostico);

        int databaseSizeBeforeUpdate = diagnosticoRepository.findAll().size();

        // Update the diagnostico
        Diagnostico updatedDiagnostico = diagnosticoRepository.findById(diagnostico.getId()).get();
        // Disconnect from session so that the updates on updatedDiagnostico are not directly saved in db
        em.detach(updatedDiagnostico);

        restDiagnosticoMockMvc.perform(put("/api/diagnosticos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDiagnostico)))
            .andExpect(status().isOk());

        // Validate the Diagnostico in the database
        List<Diagnostico> diagnosticoList = diagnosticoRepository.findAll();
        assertThat(diagnosticoList).hasSize(databaseSizeBeforeUpdate);
        Diagnostico testDiagnostico = diagnosticoList.get(diagnosticoList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingDiagnostico() throws Exception {
        int databaseSizeBeforeUpdate = diagnosticoRepository.findAll().size();

        // Create the Diagnostico

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDiagnosticoMockMvc.perform(put("/api/diagnosticos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(diagnostico)))
            .andExpect(status().isBadRequest());

        // Validate the Diagnostico in the database
        List<Diagnostico> diagnosticoList = diagnosticoRepository.findAll();
        assertThat(diagnosticoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDiagnostico() throws Exception {
        // Initialize the database
        diagnosticoRepository.saveAndFlush(diagnostico);

        int databaseSizeBeforeDelete = diagnosticoRepository.findAll().size();

        // Get the diagnostico
        restDiagnosticoMockMvc.perform(delete("/api/diagnosticos/{id}", diagnostico.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Diagnostico> diagnosticoList = diagnosticoRepository.findAll();
        assertThat(diagnosticoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Diagnostico.class);
        Diagnostico diagnostico1 = new Diagnostico();
        diagnostico1.setId(1L);
        Diagnostico diagnostico2 = new Diagnostico();
        diagnostico2.setId(diagnostico1.getId());
        assertThat(diagnostico1).isEqualTo(diagnostico2);
        diagnostico2.setId(2L);
        assertThat(diagnostico1).isNotEqualTo(diagnostico2);
        diagnostico1.setId(null);
        assertThat(diagnostico1).isNotEqualTo(diagnostico2);
    }
}

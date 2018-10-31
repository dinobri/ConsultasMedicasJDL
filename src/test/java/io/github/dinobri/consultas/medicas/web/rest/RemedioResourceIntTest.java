package io.github.dinobri.consultas.medicas.web.rest;

import io.github.dinobri.consultas.medicas.ConsultasMedicasJdlApp;

import io.github.dinobri.consultas.medicas.domain.Remedio;
import io.github.dinobri.consultas.medicas.repository.RemedioRepository;
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
 * Test class for the RemedioResource REST controller.
 *
 * @see RemedioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ConsultasMedicasJdlApp.class)
public class RemedioResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_PRINCIPO_ATIVO = "AAAAAAAAAA";
    private static final String UPDATED_PRINCIPO_ATIVO = "BBBBBBBBBB";

    private static final Double DEFAULT_CONCENTRACAO = 1D;
    private static final Double UPDATED_CONCENTRACAO = 2D;

    @Autowired
    private RemedioRepository remedioRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRemedioMockMvc;

    private Remedio remedio;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RemedioResource remedioResource = new RemedioResource(remedioRepository);
        this.restRemedioMockMvc = MockMvcBuilders.standaloneSetup(remedioResource)
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
    public static Remedio createEntity(EntityManager em) {
        Remedio remedio = new Remedio()
            .nome(DEFAULT_NOME)
            .principoAtivo(DEFAULT_PRINCIPO_ATIVO)
            .concentracao(DEFAULT_CONCENTRACAO);
        return remedio;
    }

    @Before
    public void initTest() {
        remedio = createEntity(em);
    }

    @Test
    @Transactional
    public void createRemedio() throws Exception {
        int databaseSizeBeforeCreate = remedioRepository.findAll().size();

        // Create the Remedio
        restRemedioMockMvc.perform(post("/api/remedios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(remedio)))
            .andExpect(status().isCreated());

        // Validate the Remedio in the database
        List<Remedio> remedioList = remedioRepository.findAll();
        assertThat(remedioList).hasSize(databaseSizeBeforeCreate + 1);
        Remedio testRemedio = remedioList.get(remedioList.size() - 1);
        assertThat(testRemedio.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testRemedio.getPrincipoAtivo()).isEqualTo(DEFAULT_PRINCIPO_ATIVO);
        assertThat(testRemedio.getConcentracao()).isEqualTo(DEFAULT_CONCENTRACAO);
    }

    @Test
    @Transactional
    public void createRemedioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = remedioRepository.findAll().size();

        // Create the Remedio with an existing ID
        remedio.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRemedioMockMvc.perform(post("/api/remedios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(remedio)))
            .andExpect(status().isBadRequest());

        // Validate the Remedio in the database
        List<Remedio> remedioList = remedioRepository.findAll();
        assertThat(remedioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRemedios() throws Exception {
        // Initialize the database
        remedioRepository.saveAndFlush(remedio);

        // Get all the remedioList
        restRemedioMockMvc.perform(get("/api/remedios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(remedio.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].principoAtivo").value(hasItem(DEFAULT_PRINCIPO_ATIVO.toString())))
            .andExpect(jsonPath("$.[*].concentracao").value(hasItem(DEFAULT_CONCENTRACAO.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getRemedio() throws Exception {
        // Initialize the database
        remedioRepository.saveAndFlush(remedio);

        // Get the remedio
        restRemedioMockMvc.perform(get("/api/remedios/{id}", remedio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(remedio.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.principoAtivo").value(DEFAULT_PRINCIPO_ATIVO.toString()))
            .andExpect(jsonPath("$.concentracao").value(DEFAULT_CONCENTRACAO.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRemedio() throws Exception {
        // Get the remedio
        restRemedioMockMvc.perform(get("/api/remedios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRemedio() throws Exception {
        // Initialize the database
        remedioRepository.saveAndFlush(remedio);

        int databaseSizeBeforeUpdate = remedioRepository.findAll().size();

        // Update the remedio
        Remedio updatedRemedio = remedioRepository.findById(remedio.getId()).get();
        // Disconnect from session so that the updates on updatedRemedio are not directly saved in db
        em.detach(updatedRemedio);
        updatedRemedio
            .nome(UPDATED_NOME)
            .principoAtivo(UPDATED_PRINCIPO_ATIVO)
            .concentracao(UPDATED_CONCENTRACAO);

        restRemedioMockMvc.perform(put("/api/remedios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRemedio)))
            .andExpect(status().isOk());

        // Validate the Remedio in the database
        List<Remedio> remedioList = remedioRepository.findAll();
        assertThat(remedioList).hasSize(databaseSizeBeforeUpdate);
        Remedio testRemedio = remedioList.get(remedioList.size() - 1);
        assertThat(testRemedio.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testRemedio.getPrincipoAtivo()).isEqualTo(UPDATED_PRINCIPO_ATIVO);
        assertThat(testRemedio.getConcentracao()).isEqualTo(UPDATED_CONCENTRACAO);
    }

    @Test
    @Transactional
    public void updateNonExistingRemedio() throws Exception {
        int databaseSizeBeforeUpdate = remedioRepository.findAll().size();

        // Create the Remedio

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRemedioMockMvc.perform(put("/api/remedios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(remedio)))
            .andExpect(status().isBadRequest());

        // Validate the Remedio in the database
        List<Remedio> remedioList = remedioRepository.findAll();
        assertThat(remedioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRemedio() throws Exception {
        // Initialize the database
        remedioRepository.saveAndFlush(remedio);

        int databaseSizeBeforeDelete = remedioRepository.findAll().size();

        // Get the remedio
        restRemedioMockMvc.perform(delete("/api/remedios/{id}", remedio.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Remedio> remedioList = remedioRepository.findAll();
        assertThat(remedioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Remedio.class);
        Remedio remedio1 = new Remedio();
        remedio1.setId(1L);
        Remedio remedio2 = new Remedio();
        remedio2.setId(remedio1.getId());
        assertThat(remedio1).isEqualTo(remedio2);
        remedio2.setId(2L);
        assertThat(remedio1).isNotEqualTo(remedio2);
        remedio1.setId(null);
        assertThat(remedio1).isNotEqualTo(remedio2);
    }
}

package io.github.dinobri.consultas.medicas.web.rest;

import io.github.dinobri.consultas.medicas.ConsultasMedicasJdlApp;

import io.github.dinobri.consultas.medicas.domain.Sintoma;
import io.github.dinobri.consultas.medicas.repository.SintomaRepository;
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
 * Test class for the SintomaResource REST controller.
 *
 * @see SintomaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ConsultasMedicasJdlApp.class)
public class SintomaResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private SintomaRepository sintomaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSintomaMockMvc;

    private Sintoma sintoma;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SintomaResource sintomaResource = new SintomaResource(sintomaRepository);
        this.restSintomaMockMvc = MockMvcBuilders.standaloneSetup(sintomaResource)
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
    public static Sintoma createEntity(EntityManager em) {
        Sintoma sintoma = new Sintoma()
            .nome(DEFAULT_NOME);
        return sintoma;
    }

    @Before
    public void initTest() {
        sintoma = createEntity(em);
    }

    @Test
    @Transactional
    public void createSintoma() throws Exception {
        int databaseSizeBeforeCreate = sintomaRepository.findAll().size();

        // Create the Sintoma
        restSintomaMockMvc.perform(post("/api/sintomas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sintoma)))
            .andExpect(status().isCreated());

        // Validate the Sintoma in the database
        List<Sintoma> sintomaList = sintomaRepository.findAll();
        assertThat(sintomaList).hasSize(databaseSizeBeforeCreate + 1);
        Sintoma testSintoma = sintomaList.get(sintomaList.size() - 1);
        assertThat(testSintoma.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createSintomaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sintomaRepository.findAll().size();

        // Create the Sintoma with an existing ID
        sintoma.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSintomaMockMvc.perform(post("/api/sintomas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sintoma)))
            .andExpect(status().isBadRequest());

        // Validate the Sintoma in the database
        List<Sintoma> sintomaList = sintomaRepository.findAll();
        assertThat(sintomaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSintomas() throws Exception {
        // Initialize the database
        sintomaRepository.saveAndFlush(sintoma);

        // Get all the sintomaList
        restSintomaMockMvc.perform(get("/api/sintomas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sintoma.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())));
    }
    
    @Test
    @Transactional
    public void getSintoma() throws Exception {
        // Initialize the database
        sintomaRepository.saveAndFlush(sintoma);

        // Get the sintoma
        restSintomaMockMvc.perform(get("/api/sintomas/{id}", sintoma.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sintoma.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSintoma() throws Exception {
        // Get the sintoma
        restSintomaMockMvc.perform(get("/api/sintomas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSintoma() throws Exception {
        // Initialize the database
        sintomaRepository.saveAndFlush(sintoma);

        int databaseSizeBeforeUpdate = sintomaRepository.findAll().size();

        // Update the sintoma
        Sintoma updatedSintoma = sintomaRepository.findById(sintoma.getId()).get();
        // Disconnect from session so that the updates on updatedSintoma are not directly saved in db
        em.detach(updatedSintoma);
        updatedSintoma
            .nome(UPDATED_NOME);

        restSintomaMockMvc.perform(put("/api/sintomas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSintoma)))
            .andExpect(status().isOk());

        // Validate the Sintoma in the database
        List<Sintoma> sintomaList = sintomaRepository.findAll();
        assertThat(sintomaList).hasSize(databaseSizeBeforeUpdate);
        Sintoma testSintoma = sintomaList.get(sintomaList.size() - 1);
        assertThat(testSintoma.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingSintoma() throws Exception {
        int databaseSizeBeforeUpdate = sintomaRepository.findAll().size();

        // Create the Sintoma

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSintomaMockMvc.perform(put("/api/sintomas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sintoma)))
            .andExpect(status().isBadRequest());

        // Validate the Sintoma in the database
        List<Sintoma> sintomaList = sintomaRepository.findAll();
        assertThat(sintomaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSintoma() throws Exception {
        // Initialize the database
        sintomaRepository.saveAndFlush(sintoma);

        int databaseSizeBeforeDelete = sintomaRepository.findAll().size();

        // Get the sintoma
        restSintomaMockMvc.perform(delete("/api/sintomas/{id}", sintoma.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Sintoma> sintomaList = sintomaRepository.findAll();
        assertThat(sintomaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Sintoma.class);
        Sintoma sintoma1 = new Sintoma();
        sintoma1.setId(1L);
        Sintoma sintoma2 = new Sintoma();
        sintoma2.setId(sintoma1.getId());
        assertThat(sintoma1).isEqualTo(sintoma2);
        sintoma2.setId(2L);
        assertThat(sintoma1).isNotEqualTo(sintoma2);
        sintoma1.setId(null);
        assertThat(sintoma1).isNotEqualTo(sintoma2);
    }
}

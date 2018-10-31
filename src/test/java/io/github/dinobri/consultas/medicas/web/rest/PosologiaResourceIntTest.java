package io.github.dinobri.consultas.medicas.web.rest;

import io.github.dinobri.consultas.medicas.ConsultasMedicasJdlApp;

import io.github.dinobri.consultas.medicas.domain.Posologia;
import io.github.dinobri.consultas.medicas.repository.PosologiaRepository;
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
 * Test class for the PosologiaResource REST controller.
 *
 * @see PosologiaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ConsultasMedicasJdlApp.class)
public class PosologiaResourceIntTest {

    private static final Integer DEFAULT_PERIODO = 1;
    private static final Integer UPDATED_PERIODO = 2;

    private static final Integer DEFAULT_DURACAO = 1;
    private static final Integer UPDATED_DURACAO = 2;

    private static final Integer DEFAULT_QUANTIDADE = 1;
    private static final Integer UPDATED_QUANTIDADE = 2;

    private static final String DEFAULT_OBSERVACAO = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACAO = "BBBBBBBBBB";

    @Autowired
    private PosologiaRepository posologiaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPosologiaMockMvc;

    private Posologia posologia;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PosologiaResource posologiaResource = new PosologiaResource(posologiaRepository);
        this.restPosologiaMockMvc = MockMvcBuilders.standaloneSetup(posologiaResource)
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
    public static Posologia createEntity(EntityManager em) {
        Posologia posologia = new Posologia()
            .periodo(DEFAULT_PERIODO)
            .duracao(DEFAULT_DURACAO)
            .quantidade(DEFAULT_QUANTIDADE)
            .observacao(DEFAULT_OBSERVACAO);
        return posologia;
    }

    @Before
    public void initTest() {
        posologia = createEntity(em);
    }

    @Test
    @Transactional
    public void createPosologia() throws Exception {
        int databaseSizeBeforeCreate = posologiaRepository.findAll().size();

        // Create the Posologia
        restPosologiaMockMvc.perform(post("/api/posologias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(posologia)))
            .andExpect(status().isCreated());

        // Validate the Posologia in the database
        List<Posologia> posologiaList = posologiaRepository.findAll();
        assertThat(posologiaList).hasSize(databaseSizeBeforeCreate + 1);
        Posologia testPosologia = posologiaList.get(posologiaList.size() - 1);
        assertThat(testPosologia.getPeriodo()).isEqualTo(DEFAULT_PERIODO);
        assertThat(testPosologia.getDuracao()).isEqualTo(DEFAULT_DURACAO);
        assertThat(testPosologia.getQuantidade()).isEqualTo(DEFAULT_QUANTIDADE);
        assertThat(testPosologia.getObservacao()).isEqualTo(DEFAULT_OBSERVACAO);
    }

    @Test
    @Transactional
    public void createPosologiaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = posologiaRepository.findAll().size();

        // Create the Posologia with an existing ID
        posologia.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPosologiaMockMvc.perform(post("/api/posologias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(posologia)))
            .andExpect(status().isBadRequest());

        // Validate the Posologia in the database
        List<Posologia> posologiaList = posologiaRepository.findAll();
        assertThat(posologiaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPosologias() throws Exception {
        // Initialize the database
        posologiaRepository.saveAndFlush(posologia);

        // Get all the posologiaList
        restPosologiaMockMvc.perform(get("/api/posologias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(posologia.getId().intValue())))
            .andExpect(jsonPath("$.[*].periodo").value(hasItem(DEFAULT_PERIODO)))
            .andExpect(jsonPath("$.[*].duracao").value(hasItem(DEFAULT_DURACAO)))
            .andExpect(jsonPath("$.[*].quantidade").value(hasItem(DEFAULT_QUANTIDADE)))
            .andExpect(jsonPath("$.[*].observacao").value(hasItem(DEFAULT_OBSERVACAO.toString())));
    }
    
    @Test
    @Transactional
    public void getPosologia() throws Exception {
        // Initialize the database
        posologiaRepository.saveAndFlush(posologia);

        // Get the posologia
        restPosologiaMockMvc.perform(get("/api/posologias/{id}", posologia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(posologia.getId().intValue()))
            .andExpect(jsonPath("$.periodo").value(DEFAULT_PERIODO))
            .andExpect(jsonPath("$.duracao").value(DEFAULT_DURACAO))
            .andExpect(jsonPath("$.quantidade").value(DEFAULT_QUANTIDADE))
            .andExpect(jsonPath("$.observacao").value(DEFAULT_OBSERVACAO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPosologia() throws Exception {
        // Get the posologia
        restPosologiaMockMvc.perform(get("/api/posologias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePosologia() throws Exception {
        // Initialize the database
        posologiaRepository.saveAndFlush(posologia);

        int databaseSizeBeforeUpdate = posologiaRepository.findAll().size();

        // Update the posologia
        Posologia updatedPosologia = posologiaRepository.findById(posologia.getId()).get();
        // Disconnect from session so that the updates on updatedPosologia are not directly saved in db
        em.detach(updatedPosologia);
        updatedPosologia
            .periodo(UPDATED_PERIODO)
            .duracao(UPDATED_DURACAO)
            .quantidade(UPDATED_QUANTIDADE)
            .observacao(UPDATED_OBSERVACAO);

        restPosologiaMockMvc.perform(put("/api/posologias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPosologia)))
            .andExpect(status().isOk());

        // Validate the Posologia in the database
        List<Posologia> posologiaList = posologiaRepository.findAll();
        assertThat(posologiaList).hasSize(databaseSizeBeforeUpdate);
        Posologia testPosologia = posologiaList.get(posologiaList.size() - 1);
        assertThat(testPosologia.getPeriodo()).isEqualTo(UPDATED_PERIODO);
        assertThat(testPosologia.getDuracao()).isEqualTo(UPDATED_DURACAO);
        assertThat(testPosologia.getQuantidade()).isEqualTo(UPDATED_QUANTIDADE);
        assertThat(testPosologia.getObservacao()).isEqualTo(UPDATED_OBSERVACAO);
    }

    @Test
    @Transactional
    public void updateNonExistingPosologia() throws Exception {
        int databaseSizeBeforeUpdate = posologiaRepository.findAll().size();

        // Create the Posologia

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPosologiaMockMvc.perform(put("/api/posologias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(posologia)))
            .andExpect(status().isBadRequest());

        // Validate the Posologia in the database
        List<Posologia> posologiaList = posologiaRepository.findAll();
        assertThat(posologiaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePosologia() throws Exception {
        // Initialize the database
        posologiaRepository.saveAndFlush(posologia);

        int databaseSizeBeforeDelete = posologiaRepository.findAll().size();

        // Get the posologia
        restPosologiaMockMvc.perform(delete("/api/posologias/{id}", posologia.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Posologia> posologiaList = posologiaRepository.findAll();
        assertThat(posologiaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Posologia.class);
        Posologia posologia1 = new Posologia();
        posologia1.setId(1L);
        Posologia posologia2 = new Posologia();
        posologia2.setId(posologia1.getId());
        assertThat(posologia1).isEqualTo(posologia2);
        posologia2.setId(2L);
        assertThat(posologia1).isNotEqualTo(posologia2);
        posologia1.setId(null);
        assertThat(posologia1).isNotEqualTo(posologia2);
    }
}

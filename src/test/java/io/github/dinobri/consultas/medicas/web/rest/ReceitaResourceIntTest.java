package io.github.dinobri.consultas.medicas.web.rest;

import io.github.dinobri.consultas.medicas.ConsultasMedicasJdlApp;

import io.github.dinobri.consultas.medicas.domain.Receita;
import io.github.dinobri.consultas.medicas.repository.ReceitaRepository;
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
 * Test class for the ReceitaResource REST controller.
 *
 * @see ReceitaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ConsultasMedicasJdlApp.class)
public class ReceitaResourceIntTest {

    private static final String DEFAULT_OBSERVACOES = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACOES = "BBBBBBBBBB";

    @Autowired
    private ReceitaRepository receitaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restReceitaMockMvc;

    private Receita receita;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReceitaResource receitaResource = new ReceitaResource(receitaRepository);
        this.restReceitaMockMvc = MockMvcBuilders.standaloneSetup(receitaResource)
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
    public static Receita createEntity(EntityManager em) {
        Receita receita = new Receita()
            .observacoes(DEFAULT_OBSERVACOES);
        return receita;
    }

    @Before
    public void initTest() {
        receita = createEntity(em);
    }

    @Test
    @Transactional
    public void createReceita() throws Exception {
        int databaseSizeBeforeCreate = receitaRepository.findAll().size();

        // Create the Receita
        restReceitaMockMvc.perform(post("/api/receitas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receita)))
            .andExpect(status().isCreated());

        // Validate the Receita in the database
        List<Receita> receitaList = receitaRepository.findAll();
        assertThat(receitaList).hasSize(databaseSizeBeforeCreate + 1);
        Receita testReceita = receitaList.get(receitaList.size() - 1);
        assertThat(testReceita.getObservacoes()).isEqualTo(DEFAULT_OBSERVACOES);
    }

    @Test
    @Transactional
    public void createReceitaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = receitaRepository.findAll().size();

        // Create the Receita with an existing ID
        receita.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReceitaMockMvc.perform(post("/api/receitas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receita)))
            .andExpect(status().isBadRequest());

        // Validate the Receita in the database
        List<Receita> receitaList = receitaRepository.findAll();
        assertThat(receitaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllReceitas() throws Exception {
        // Initialize the database
        receitaRepository.saveAndFlush(receita);

        // Get all the receitaList
        restReceitaMockMvc.perform(get("/api/receitas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(receita.getId().intValue())))
            .andExpect(jsonPath("$.[*].observacoes").value(hasItem(DEFAULT_OBSERVACOES.toString())));
    }
    
    @Test
    @Transactional
    public void getReceita() throws Exception {
        // Initialize the database
        receitaRepository.saveAndFlush(receita);

        // Get the receita
        restReceitaMockMvc.perform(get("/api/receitas/{id}", receita.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(receita.getId().intValue()))
            .andExpect(jsonPath("$.observacoes").value(DEFAULT_OBSERVACOES.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingReceita() throws Exception {
        // Get the receita
        restReceitaMockMvc.perform(get("/api/receitas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReceita() throws Exception {
        // Initialize the database
        receitaRepository.saveAndFlush(receita);

        int databaseSizeBeforeUpdate = receitaRepository.findAll().size();

        // Update the receita
        Receita updatedReceita = receitaRepository.findById(receita.getId()).get();
        // Disconnect from session so that the updates on updatedReceita are not directly saved in db
        em.detach(updatedReceita);
        updatedReceita
            .observacoes(UPDATED_OBSERVACOES);

        restReceitaMockMvc.perform(put("/api/receitas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReceita)))
            .andExpect(status().isOk());

        // Validate the Receita in the database
        List<Receita> receitaList = receitaRepository.findAll();
        assertThat(receitaList).hasSize(databaseSizeBeforeUpdate);
        Receita testReceita = receitaList.get(receitaList.size() - 1);
        assertThat(testReceita.getObservacoes()).isEqualTo(UPDATED_OBSERVACOES);
    }

    @Test
    @Transactional
    public void updateNonExistingReceita() throws Exception {
        int databaseSizeBeforeUpdate = receitaRepository.findAll().size();

        // Create the Receita

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReceitaMockMvc.perform(put("/api/receitas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(receita)))
            .andExpect(status().isBadRequest());

        // Validate the Receita in the database
        List<Receita> receitaList = receitaRepository.findAll();
        assertThat(receitaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReceita() throws Exception {
        // Initialize the database
        receitaRepository.saveAndFlush(receita);

        int databaseSizeBeforeDelete = receitaRepository.findAll().size();

        // Get the receita
        restReceitaMockMvc.perform(delete("/api/receitas/{id}", receita.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Receita> receitaList = receitaRepository.findAll();
        assertThat(receitaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Receita.class);
        Receita receita1 = new Receita();
        receita1.setId(1L);
        Receita receita2 = new Receita();
        receita2.setId(receita1.getId());
        assertThat(receita1).isEqualTo(receita2);
        receita2.setId(2L);
        assertThat(receita1).isNotEqualTo(receita2);
        receita1.setId(null);
        assertThat(receita1).isNotEqualTo(receita2);
    }
}

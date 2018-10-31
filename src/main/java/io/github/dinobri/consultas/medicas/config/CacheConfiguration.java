package io.github.dinobri.consultas.medicas.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(io.github.dinobri.consultas.medicas.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(io.github.dinobri.consultas.medicas.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(io.github.dinobri.consultas.medicas.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.dinobri.consultas.medicas.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.dinobri.consultas.medicas.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(io.github.dinobri.consultas.medicas.domain.Especialidade.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.dinobri.consultas.medicas.domain.Especialidade.class.getName() + ".medicos", jcacheConfiguration);
            cm.createCache(io.github.dinobri.consultas.medicas.domain.Medico.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.dinobri.consultas.medicas.domain.Medico.class.getName() + ".especialidades", jcacheConfiguration);
            cm.createCache(io.github.dinobri.consultas.medicas.domain.Medico.class.getName() + ".agendamentoConsultas", jcacheConfiguration);
            cm.createCache(io.github.dinobri.consultas.medicas.domain.Medico.class.getName() + ".consultas", jcacheConfiguration);
            cm.createCache(io.github.dinobri.consultas.medicas.domain.Paciente.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.dinobri.consultas.medicas.domain.Paciente.class.getName() + ".diagnosticos", jcacheConfiguration);
            cm.createCache(io.github.dinobri.consultas.medicas.domain.Paciente.class.getName() + ".doencas", jcacheConfiguration);
            cm.createCache(io.github.dinobri.consultas.medicas.domain.Paciente.class.getName() + ".agendamentoConsultas", jcacheConfiguration);
            cm.createCache(io.github.dinobri.consultas.medicas.domain.Paciente.class.getName() + ".consultas", jcacheConfiguration);
            cm.createCache(io.github.dinobri.consultas.medicas.domain.Consulta.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.dinobri.consultas.medicas.domain.Consulta.class.getName() + ".diagnosticos", jcacheConfiguration);
            cm.createCache(io.github.dinobri.consultas.medicas.domain.AgendamentoConsulta.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.dinobri.consultas.medicas.domain.Consultorio.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.dinobri.consultas.medicas.domain.Consultorio.class.getName() + ".consultas", jcacheConfiguration);
            cm.createCache(io.github.dinobri.consultas.medicas.domain.Receita.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.dinobri.consultas.medicas.domain.Receita.class.getName() + ".posologias", jcacheConfiguration);
            cm.createCache(io.github.dinobri.consultas.medicas.domain.Remedio.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.dinobri.consultas.medicas.domain.Remedio.class.getName() + ".posologias", jcacheConfiguration);
            cm.createCache(io.github.dinobri.consultas.medicas.domain.Posologia.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.dinobri.consultas.medicas.domain.Diagnostico.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.dinobri.consultas.medicas.domain.Doenca.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.dinobri.consultas.medicas.domain.Doenca.class.getName() + ".sintomas", jcacheConfiguration);
            cm.createCache(io.github.dinobri.consultas.medicas.domain.Doenca.class.getName() + ".diagnosticos", jcacheConfiguration);
            cm.createCache(io.github.dinobri.consultas.medicas.domain.Doenca.class.getName() + ".pacientes", jcacheConfiguration);
            cm.createCache(io.github.dinobri.consultas.medicas.domain.Sintoma.class.getName(), jcacheConfiguration);
            cm.createCache(io.github.dinobri.consultas.medicas.domain.Sintoma.class.getName() + ".doencas", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}

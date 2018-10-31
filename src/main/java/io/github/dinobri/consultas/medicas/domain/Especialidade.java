package io.github.dinobri.consultas.medicas.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Especialidade.
 */
@Entity
@Table(name = "especialidade")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Especialidade implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @ManyToMany(mappedBy = "especialidades")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Medico> medicos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Especialidade nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Set<Medico> getMedicos() {
        return medicos;
    }

    public Especialidade medicos(Set<Medico> medicos) {
        this.medicos = medicos;
        return this;
    }

    public Especialidade addMedico(Medico medico) {
        this.medicos.add(medico);
        medico.getEspecialidades().add(this);
        return this;
    }

    public Especialidade removeMedico(Medico medico) {
        this.medicos.remove(medico);
        medico.getEspecialidades().remove(this);
        return this;
    }

    public void setMedicos(Set<Medico> medicos) {
        this.medicos = medicos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Especialidade especialidade = (Especialidade) o;
        if (especialidade.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), especialidade.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Especialidade{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}

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
 * A Sintoma.
 */
@Entity
@Table(name = "sintoma")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Sintoma implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @ManyToMany(mappedBy = "sintomas")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Doenca> doencas = new HashSet<>();

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

    public Sintoma nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Set<Doenca> getDoencas() {
        return doencas;
    }

    public Sintoma doencas(Set<Doenca> doencas) {
        this.doencas = doencas;
        return this;
    }

    public Sintoma addDoenca(Doenca doenca) {
        this.doencas.add(doenca);
        doenca.getSintomas().add(this);
        return this;
    }

    public Sintoma removeDoenca(Doenca doenca) {
        this.doencas.remove(doenca);
        doenca.getSintomas().remove(this);
        return this;
    }

    public void setDoencas(Set<Doenca> doencas) {
        this.doencas = doencas;
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
        Sintoma sintoma = (Sintoma) o;
        if (sintoma.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sintoma.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Sintoma{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}

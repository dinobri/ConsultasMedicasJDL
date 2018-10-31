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
 * A Receita.
 */
@Entity
@Table(name = "receita")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Receita implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "observacoes")
    private String observacoes;

    @OneToOne(mappedBy = "receita")
    @JsonIgnore
    private Consulta consulta;

    @OneToMany(mappedBy = "receita")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Posologia> posologias = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public Receita observacoes(String observacoes) {
        this.observacoes = observacoes;
        return this;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public Consulta getConsulta() {
        return consulta;
    }

    public Receita consulta(Consulta consulta) {
        this.consulta = consulta;
        return this;
    }

    public void setConsulta(Consulta consulta) {
        this.consulta = consulta;
    }

    public Set<Posologia> getPosologias() {
        return posologias;
    }

    public Receita posologias(Set<Posologia> posologias) {
        this.posologias = posologias;
        return this;
    }

    public Receita addPosologia(Posologia posologia) {
        this.posologias.add(posologia);
        posologia.setReceita(this);
        return this;
    }

    public Receita removePosologia(Posologia posologia) {
        this.posologias.remove(posologia);
        posologia.setReceita(null);
        return this;
    }

    public void setPosologias(Set<Posologia> posologias) {
        this.posologias = posologias;
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
        Receita receita = (Receita) o;
        if (receita.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), receita.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Receita{" +
            "id=" + getId() +
            ", observacoes='" + getObservacoes() + "'" +
            "}";
    }
}

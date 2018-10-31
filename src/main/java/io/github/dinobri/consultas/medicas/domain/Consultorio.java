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
 * A Consultorio.
 */
@Entity
@Table(name = "consultorio")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Consultorio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero")
    private Integer numero;

    @OneToMany(mappedBy = "consultorio")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Consulta> consultas = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumero() {
        return numero;
    }

    public Consultorio numero(Integer numero) {
        this.numero = numero;
        return this;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public Set<Consulta> getConsultas() {
        return consultas;
    }

    public Consultorio consultas(Set<Consulta> consultas) {
        this.consultas = consultas;
        return this;
    }

    public Consultorio addConsulta(Consulta consulta) {
        this.consultas.add(consulta);
        consulta.setConsultorio(this);
        return this;
    }

    public Consultorio removeConsulta(Consulta consulta) {
        this.consultas.remove(consulta);
        consulta.setConsultorio(null);
        return this;
    }

    public void setConsultas(Set<Consulta> consultas) {
        this.consultas = consultas;
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
        Consultorio consultorio = (Consultorio) o;
        if (consultorio.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), consultorio.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Consultorio{" +
            "id=" + getId() +
            ", numero=" + getNumero() +
            "}";
    }
}

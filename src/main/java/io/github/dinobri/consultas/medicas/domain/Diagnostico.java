package io.github.dinobri.consultas.medicas.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Diagnostico.
 */
@Entity
@Table(name = "diagnostico")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Diagnostico implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties("diagnosticos")
    private Doenca doenca;

    @ManyToOne
    @JsonIgnoreProperties("diagnosticos")
    private Consulta consulta;

    @ManyToOne
    @JsonIgnoreProperties("diagnosticos")
    private Paciente paciente;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Doenca getDoenca() {
        return doenca;
    }

    public Diagnostico doenca(Doenca doenca) {
        this.doenca = doenca;
        return this;
    }

    public void setDoenca(Doenca doenca) {
        this.doenca = doenca;
    }

    public Consulta getConsulta() {
        return consulta;
    }

    public Diagnostico consulta(Consulta consulta) {
        this.consulta = consulta;
        return this;
    }

    public void setConsulta(Consulta consulta) {
        this.consulta = consulta;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public Diagnostico paciente(Paciente paciente) {
        this.paciente = paciente;
        return this;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
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
        Diagnostico diagnostico = (Diagnostico) o;
        if (diagnostico.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), diagnostico.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Diagnostico{" +
            "id=" + getId() +
            "}";
    }
}

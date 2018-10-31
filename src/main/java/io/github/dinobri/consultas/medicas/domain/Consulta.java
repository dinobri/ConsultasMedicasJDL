package io.github.dinobri.consultas.medicas.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Consulta.
 */
@Entity
@Table(name = "consulta")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Consulta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_hora")
    private LocalDate dataHora;

    @OneToOne    @JoinColumn(unique = true)
    private Receita receita;

    @OneToMany(mappedBy = "consulta")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Diagnostico> diagnosticos = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("consultas")
    private Consultorio consultorio;

    @ManyToOne
    @JsonIgnoreProperties("consultas")
    private Paciente paciente;

    @ManyToOne
    @JsonIgnoreProperties("consultas")
    private Medico medico;

    @OneToOne(mappedBy = "consulta")
    @JsonIgnore
    private AgendamentoConsulta agendamentoConsulta;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDataHora() {
        return dataHora;
    }

    public Consulta dataHora(LocalDate dataHora) {
        this.dataHora = dataHora;
        return this;
    }

    public void setDataHora(LocalDate dataHora) {
        this.dataHora = dataHora;
    }

    public Receita getReceita() {
        return receita;
    }

    public Consulta receita(Receita receita) {
        this.receita = receita;
        return this;
    }

    public void setReceita(Receita receita) {
        this.receita = receita;
    }

    public Set<Diagnostico> getDiagnosticos() {
        return diagnosticos;
    }

    public Consulta diagnosticos(Set<Diagnostico> diagnosticos) {
        this.diagnosticos = diagnosticos;
        return this;
    }

    public Consulta addDiagnostico(Diagnostico diagnostico) {
        this.diagnosticos.add(diagnostico);
        diagnostico.setConsulta(this);
        return this;
    }

    public Consulta removeDiagnostico(Diagnostico diagnostico) {
        this.diagnosticos.remove(diagnostico);
        diagnostico.setConsulta(null);
        return this;
    }

    public void setDiagnosticos(Set<Diagnostico> diagnosticos) {
        this.diagnosticos = diagnosticos;
    }

    public Consultorio getConsultorio() {
        return consultorio;
    }

    public Consulta consultorio(Consultorio consultorio) {
        this.consultorio = consultorio;
        return this;
    }

    public void setConsultorio(Consultorio consultorio) {
        this.consultorio = consultorio;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public Consulta paciente(Paciente paciente) {
        this.paciente = paciente;
        return this;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public Medico getMedico() {
        return medico;
    }

    public Consulta medico(Medico medico) {
        this.medico = medico;
        return this;
    }

    public void setMedico(Medico medico) {
        this.medico = medico;
    }

    public AgendamentoConsulta getAgendamentoConsulta() {
        return agendamentoConsulta;
    }

    public Consulta agendamentoConsulta(AgendamentoConsulta agendamentoConsulta) {
        this.agendamentoConsulta = agendamentoConsulta;
        return this;
    }

    public void setAgendamentoConsulta(AgendamentoConsulta agendamentoConsulta) {
        this.agendamentoConsulta = agendamentoConsulta;
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
        Consulta consulta = (Consulta) o;
        if (consulta.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), consulta.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Consulta{" +
            "id=" + getId() +
            ", dataHora='" + getDataHora() + "'" +
            "}";
    }
}

package io.github.dinobri.consultas.medicas.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A AgendamentoConsulta.
 */
@Entity
@Table(name = "agendamento_consulta")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AgendamentoConsulta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data")
    private LocalDate data;

    @Column(name = "hora_inicio")
    private Integer horaInicio;

    @Column(name = "hora_fim")
    private Integer horaFim;

    @Column(name = "is_hora_marcada")
    private Boolean isHoraMarcada;

    @OneToOne    @JoinColumn(unique = true)
    private Consulta consulta;

    @ManyToOne
    @JsonIgnoreProperties("agendamentoConsultas")
    private Paciente paciente;

    @ManyToOne
    @JsonIgnoreProperties("agendamentoConsultas")
    private Medico medico;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getData() {
        return data;
    }

    public AgendamentoConsulta data(LocalDate data) {
        this.data = data;
        return this;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Integer getHoraInicio() {
        return horaInicio;
    }

    public AgendamentoConsulta horaInicio(Integer horaInicio) {
        this.horaInicio = horaInicio;
        return this;
    }

    public void setHoraInicio(Integer horaInicio) {
        this.horaInicio = horaInicio;
    }

    public Integer getHoraFim() {
        return horaFim;
    }

    public AgendamentoConsulta horaFim(Integer horaFim) {
        this.horaFim = horaFim;
        return this;
    }

    public void setHoraFim(Integer horaFim) {
        this.horaFim = horaFim;
    }

    public Boolean isIsHoraMarcada() {
        return isHoraMarcada;
    }

    public AgendamentoConsulta isHoraMarcada(Boolean isHoraMarcada) {
        this.isHoraMarcada = isHoraMarcada;
        return this;
    }

    public void setIsHoraMarcada(Boolean isHoraMarcada) {
        this.isHoraMarcada = isHoraMarcada;
    }

    public Consulta getConsulta() {
        return consulta;
    }

    public AgendamentoConsulta consulta(Consulta consulta) {
        this.consulta = consulta;
        return this;
    }

    public void setConsulta(Consulta consulta) {
        this.consulta = consulta;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public AgendamentoConsulta paciente(Paciente paciente) {
        this.paciente = paciente;
        return this;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public Medico getMedico() {
        return medico;
    }

    public AgendamentoConsulta medico(Medico medico) {
        this.medico = medico;
        return this;
    }

    public void setMedico(Medico medico) {
        this.medico = medico;
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
        AgendamentoConsulta agendamentoConsulta = (AgendamentoConsulta) o;
        if (agendamentoConsulta.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), agendamentoConsulta.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AgendamentoConsulta{" +
            "id=" + getId() +
            ", data='" + getData() + "'" +
            ", horaInicio=" + getHoraInicio() +
            ", horaFim=" + getHoraFim() +
            ", isHoraMarcada='" + isIsHoraMarcada() + "'" +
            "}";
    }
}

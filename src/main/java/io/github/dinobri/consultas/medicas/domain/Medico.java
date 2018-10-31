package io.github.dinobri.consultas.medicas.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Medico.
 */
@Entity
@Table(name = "medico")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Medico implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "numero_documento")
    private String numeroDocumento;

    @Column(name = "data_nascimento")
    private LocalDate dataNascimento;

    @Column(name = "numero_crm")
    private String numeroCRM;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "medico_especialidade",
               joinColumns = @JoinColumn(name = "medicos_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "especialidades_id", referencedColumnName = "id"))
    private Set<Especialidade> especialidades = new HashSet<>();

    @OneToMany(mappedBy = "medico")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AgendamentoConsulta> agendamentoConsultas = new HashSet<>();
    @OneToMany(mappedBy = "medico")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Consulta> consultas = new HashSet<>();
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

    public Medico nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getNumeroDocumento() {
        return numeroDocumento;
    }

    public Medico numeroDocumento(String numeroDocumento) {
        this.numeroDocumento = numeroDocumento;
        return this;
    }

    public void setNumeroDocumento(String numeroDocumento) {
        this.numeroDocumento = numeroDocumento;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public Medico dataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
        return this;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getNumeroCRM() {
        return numeroCRM;
    }

    public Medico numeroCRM(String numeroCRM) {
        this.numeroCRM = numeroCRM;
        return this;
    }

    public void setNumeroCRM(String numeroCRM) {
        this.numeroCRM = numeroCRM;
    }

    public Set<Especialidade> getEspecialidades() {
        return especialidades;
    }

    public Medico especialidades(Set<Especialidade> especialidades) {
        this.especialidades = especialidades;
        return this;
    }

    public Medico addEspecialidade(Especialidade especialidade) {
        this.especialidades.add(especialidade);
        especialidade.getMedicos().add(this);
        return this;
    }

    public Medico removeEspecialidade(Especialidade especialidade) {
        this.especialidades.remove(especialidade);
        especialidade.getMedicos().remove(this);
        return this;
    }

    public void setEspecialidades(Set<Especialidade> especialidades) {
        this.especialidades = especialidades;
    }

    public Set<AgendamentoConsulta> getAgendamentoConsultas() {
        return agendamentoConsultas;
    }

    public Medico agendamentoConsultas(Set<AgendamentoConsulta> agendamentoConsultas) {
        this.agendamentoConsultas = agendamentoConsultas;
        return this;
    }

    public Medico addAgendamentoConsulta(AgendamentoConsulta agendamentoConsulta) {
        this.agendamentoConsultas.add(agendamentoConsulta);
        agendamentoConsulta.setMedico(this);
        return this;
    }

    public Medico removeAgendamentoConsulta(AgendamentoConsulta agendamentoConsulta) {
        this.agendamentoConsultas.remove(agendamentoConsulta);
        agendamentoConsulta.setMedico(null);
        return this;
    }

    public void setAgendamentoConsultas(Set<AgendamentoConsulta> agendamentoConsultas) {
        this.agendamentoConsultas = agendamentoConsultas;
    }

    public Set<Consulta> getConsultas() {
        return consultas;
    }

    public Medico consultas(Set<Consulta> consultas) {
        this.consultas = consultas;
        return this;
    }

    public Medico addConsulta(Consulta consulta) {
        this.consultas.add(consulta);
        consulta.setMedico(this);
        return this;
    }

    public Medico removeConsulta(Consulta consulta) {
        this.consultas.remove(consulta);
        consulta.setMedico(null);
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
        Medico medico = (Medico) o;
        if (medico.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), medico.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Medico{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", numeroDocumento='" + getNumeroDocumento() + "'" +
            ", dataNascimento='" + getDataNascimento() + "'" +
            ", numeroCRM='" + getNumeroCRM() + "'" +
            "}";
    }
}

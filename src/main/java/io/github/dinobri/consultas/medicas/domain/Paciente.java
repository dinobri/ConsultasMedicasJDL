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
 * A Paciente.
 */
@Entity
@Table(name = "paciente")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Paciente implements Serializable {

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

    @Column(name = "altura")
    private Double altura;

    @Column(name = "peso")
    private Double peso;

    @Column(name = "amf")
    private String amf;

    @Column(name = "amp")
    private String amp;

    @OneToMany(mappedBy = "paciente")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Diagnostico> diagnosticos = new HashSet<>();
    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "paciente_doenca",
               joinColumns = @JoinColumn(name = "pacientes_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "doencas_id", referencedColumnName = "id"))
    private Set<Doenca> doencas = new HashSet<>();

    @OneToMany(mappedBy = "paciente")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AgendamentoConsulta> agendamentoConsultas = new HashSet<>();
    @OneToMany(mappedBy = "paciente")
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

    public Paciente nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getNumeroDocumento() {
        return numeroDocumento;
    }

    public Paciente numeroDocumento(String numeroDocumento) {
        this.numeroDocumento = numeroDocumento;
        return this;
    }

    public void setNumeroDocumento(String numeroDocumento) {
        this.numeroDocumento = numeroDocumento;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public Paciente dataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
        return this;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public Double getAltura() {
        return altura;
    }

    public Paciente altura(Double altura) {
        this.altura = altura;
        return this;
    }

    public void setAltura(Double altura) {
        this.altura = altura;
    }

    public Double getPeso() {
        return peso;
    }

    public Paciente peso(Double peso) {
        this.peso = peso;
        return this;
    }

    public void setPeso(Double peso) {
        this.peso = peso;
    }

    public String getAmf() {
        return amf;
    }

    public Paciente amf(String amf) {
        this.amf = amf;
        return this;
    }

    public void setAmf(String amf) {
        this.amf = amf;
    }

    public String getAmp() {
        return amp;
    }

    public Paciente amp(String amp) {
        this.amp = amp;
        return this;
    }

    public void setAmp(String amp) {
        this.amp = amp;
    }

    public Set<Diagnostico> getDiagnosticos() {
        return diagnosticos;
    }

    public Paciente diagnosticos(Set<Diagnostico> diagnosticos) {
        this.diagnosticos = diagnosticos;
        return this;
    }

    public Paciente addDiagnostico(Diagnostico diagnostico) {
        this.diagnosticos.add(diagnostico);
        diagnostico.setPaciente(this);
        return this;
    }

    public Paciente removeDiagnostico(Diagnostico diagnostico) {
        this.diagnosticos.remove(diagnostico);
        diagnostico.setPaciente(null);
        return this;
    }

    public void setDiagnosticos(Set<Diagnostico> diagnosticos) {
        this.diagnosticos = diagnosticos;
    }

    public Set<Doenca> getDoencas() {
        return doencas;
    }

    public Paciente doencas(Set<Doenca> doencas) {
        this.doencas = doencas;
        return this;
    }

    public Paciente addDoenca(Doenca doenca) {
        this.doencas.add(doenca);
        doenca.getPacientes().add(this);
        return this;
    }

    public Paciente removeDoenca(Doenca doenca) {
        this.doencas.remove(doenca);
        doenca.getPacientes().remove(this);
        return this;
    }

    public void setDoencas(Set<Doenca> doencas) {
        this.doencas = doencas;
    }

    public Set<AgendamentoConsulta> getAgendamentoConsultas() {
        return agendamentoConsultas;
    }

    public Paciente agendamentoConsultas(Set<AgendamentoConsulta> agendamentoConsultas) {
        this.agendamentoConsultas = agendamentoConsultas;
        return this;
    }

    public Paciente addAgendamentoConsulta(AgendamentoConsulta agendamentoConsulta) {
        this.agendamentoConsultas.add(agendamentoConsulta);
        agendamentoConsulta.setPaciente(this);
        return this;
    }

    public Paciente removeAgendamentoConsulta(AgendamentoConsulta agendamentoConsulta) {
        this.agendamentoConsultas.remove(agendamentoConsulta);
        agendamentoConsulta.setPaciente(null);
        return this;
    }

    public void setAgendamentoConsultas(Set<AgendamentoConsulta> agendamentoConsultas) {
        this.agendamentoConsultas = agendamentoConsultas;
    }

    public Set<Consulta> getConsultas() {
        return consultas;
    }

    public Paciente consultas(Set<Consulta> consultas) {
        this.consultas = consultas;
        return this;
    }

    public Paciente addConsulta(Consulta consulta) {
        this.consultas.add(consulta);
        consulta.setPaciente(this);
        return this;
    }

    public Paciente removeConsulta(Consulta consulta) {
        this.consultas.remove(consulta);
        consulta.setPaciente(null);
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
        Paciente paciente = (Paciente) o;
        if (paciente.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), paciente.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Paciente{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", numeroDocumento='" + getNumeroDocumento() + "'" +
            ", dataNascimento='" + getDataNascimento() + "'" +
            ", altura=" + getAltura() +
            ", peso=" + getPeso() +
            ", amf='" + getAmf() + "'" +
            ", amp='" + getAmp() + "'" +
            "}";
    }
}

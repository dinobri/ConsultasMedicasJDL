package io.github.dinobri.consultas.medicas.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import io.github.dinobri.consultas.medicas.domain.enumeration.TipoDoenca;

/**
 * A Doenca.
 */
@Entity
@Table(name = "doenca")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Doenca implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private TipoDoenca tipo;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "doenca_sintoma",
               joinColumns = @JoinColumn(name = "doencas_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "sintomas_id", referencedColumnName = "id"))
    private Set<Sintoma> sintomas = new HashSet<>();

    @OneToMany(mappedBy = "doenca")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Diagnostico> diagnosticos = new HashSet<>();
    @ManyToMany(mappedBy = "doencas")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Paciente> pacientes = new HashSet<>();

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

    public Doenca nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public TipoDoenca getTipo() {
        return tipo;
    }

    public Doenca tipo(TipoDoenca tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(TipoDoenca tipo) {
        this.tipo = tipo;
    }

    public Set<Sintoma> getSintomas() {
        return sintomas;
    }

    public Doenca sintomas(Set<Sintoma> sintomas) {
        this.sintomas = sintomas;
        return this;
    }

    public Doenca addSintoma(Sintoma sintoma) {
        this.sintomas.add(sintoma);
        sintoma.getDoencas().add(this);
        return this;
    }

    public Doenca removeSintoma(Sintoma sintoma) {
        this.sintomas.remove(sintoma);
        sintoma.getDoencas().remove(this);
        return this;
    }

    public void setSintomas(Set<Sintoma> sintomas) {
        this.sintomas = sintomas;
    }

    public Set<Diagnostico> getDiagnosticos() {
        return diagnosticos;
    }

    public Doenca diagnosticos(Set<Diagnostico> diagnosticos) {
        this.diagnosticos = diagnosticos;
        return this;
    }

    public Doenca addDiagnostico(Diagnostico diagnostico) {
        this.diagnosticos.add(diagnostico);
        diagnostico.setDoenca(this);
        return this;
    }

    public Doenca removeDiagnostico(Diagnostico diagnostico) {
        this.diagnosticos.remove(diagnostico);
        diagnostico.setDoenca(null);
        return this;
    }

    public void setDiagnosticos(Set<Diagnostico> diagnosticos) {
        this.diagnosticos = diagnosticos;
    }

    public Set<Paciente> getPacientes() {
        return pacientes;
    }

    public Doenca pacientes(Set<Paciente> pacientes) {
        this.pacientes = pacientes;
        return this;
    }

    public Doenca addPaciente(Paciente paciente) {
        this.pacientes.add(paciente);
        paciente.getDoencas().add(this);
        return this;
    }

    public Doenca removePaciente(Paciente paciente) {
        this.pacientes.remove(paciente);
        paciente.getDoencas().remove(this);
        return this;
    }

    public void setPacientes(Set<Paciente> pacientes) {
        this.pacientes = pacientes;
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
        Doenca doenca = (Doenca) o;
        if (doenca.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), doenca.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Doenca{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", tipo='" + getTipo() + "'" +
            "}";
    }
}

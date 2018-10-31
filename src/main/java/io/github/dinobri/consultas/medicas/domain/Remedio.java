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
 * A Remedio.
 */
@Entity
@Table(name = "remedio")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Remedio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "principo_ativo")
    private String principoAtivo;

    @Column(name = "concentracao")
    private Double concentracao;

    @OneToMany(mappedBy = "remedio")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Posologia> posologias = new HashSet<>();
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

    public Remedio nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getPrincipoAtivo() {
        return principoAtivo;
    }

    public Remedio principoAtivo(String principoAtivo) {
        this.principoAtivo = principoAtivo;
        return this;
    }

    public void setPrincipoAtivo(String principoAtivo) {
        this.principoAtivo = principoAtivo;
    }

    public Double getConcentracao() {
        return concentracao;
    }

    public Remedio concentracao(Double concentracao) {
        this.concentracao = concentracao;
        return this;
    }

    public void setConcentracao(Double concentracao) {
        this.concentracao = concentracao;
    }

    public Set<Posologia> getPosologias() {
        return posologias;
    }

    public Remedio posologias(Set<Posologia> posologias) {
        this.posologias = posologias;
        return this;
    }

    public Remedio addPosologia(Posologia posologia) {
        this.posologias.add(posologia);
        posologia.setRemedio(this);
        return this;
    }

    public Remedio removePosologia(Posologia posologia) {
        this.posologias.remove(posologia);
        posologia.setRemedio(null);
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
        Remedio remedio = (Remedio) o;
        if (remedio.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), remedio.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Remedio{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", principoAtivo='" + getPrincipoAtivo() + "'" +
            ", concentracao=" + getConcentracao() +
            "}";
    }
}

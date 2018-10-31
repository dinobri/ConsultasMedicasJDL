package io.github.dinobri.consultas.medicas.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Posologia.
 */
@Entity
@Table(name = "posologia")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Posologia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "periodo")
    private Integer periodo;

    @Column(name = "duracao")
    private Integer duracao;

    @Column(name = "quantidade")
    private Integer quantidade;

    @Column(name = "observacao")
    private String observacao;

    @ManyToOne
    @JsonIgnoreProperties("posologias")
    private Remedio remedio;

    @ManyToOne
    @JsonIgnoreProperties("posologias")
    private Receita receita;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPeriodo() {
        return periodo;
    }

    public Posologia periodo(Integer periodo) {
        this.periodo = periodo;
        return this;
    }

    public void setPeriodo(Integer periodo) {
        this.periodo = periodo;
    }

    public Integer getDuracao() {
        return duracao;
    }

    public Posologia duracao(Integer duracao) {
        this.duracao = duracao;
        return this;
    }

    public void setDuracao(Integer duracao) {
        this.duracao = duracao;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public Posologia quantidade(Integer quantidade) {
        this.quantidade = quantidade;
        return this;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public String getObservacao() {
        return observacao;
    }

    public Posologia observacao(String observacao) {
        this.observacao = observacao;
        return this;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public Remedio getRemedio() {
        return remedio;
    }

    public Posologia remedio(Remedio remedio) {
        this.remedio = remedio;
        return this;
    }

    public void setRemedio(Remedio remedio) {
        this.remedio = remedio;
    }

    public Receita getReceita() {
        return receita;
    }

    public Posologia receita(Receita receita) {
        this.receita = receita;
        return this;
    }

    public void setReceita(Receita receita) {
        this.receita = receita;
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
        Posologia posologia = (Posologia) o;
        if (posologia.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), posologia.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Posologia{" +
            "id=" + getId() +
            ", periodo=" + getPeriodo() +
            ", duracao=" + getDuracao() +
            ", quantidade=" + getQuantidade() +
            ", observacao='" + getObservacao() + "'" +
            "}";
    }
}

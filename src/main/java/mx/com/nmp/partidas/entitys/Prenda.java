package mx.com.nmp.partidas.entitys;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Prenda implements Serializable {
    private String tipo;
    private String lote;
    private String idPrenda;
    private Number numeroRefrendo;
    private String fechaEmpenio;
    private Number valorAncla;
    private Number valorMonte;
    private String elementosComplementarios;
    private Number gramaje;
    private Number prestamo;
    private String descripcionPrenda;
    private String clasificacion;
    private Number cantidad;
    private Number kilataje;
    private String idTipo;
    private String disenio;
    private String idDisenio;
    private String idClasificacion;
}

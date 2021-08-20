package mx.com.nmp.partidas.entitys;

import java.io.Serializable;
import javax.validation.constraints.NotNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@RedisHash("partida")
public class Partida implements Serializable {
    @NotNull(message="Se debe incluir el campo id")
    private @Id String id;
    @NotNull(message="Se debe incluir el campo idCliente")
    private String idCliente;
    @NotNull(message="Se debe incluir el campo nivelCliente")
    private String nivelCliente;
    @NotNull(message="Se debe incluir el campo calificacionAjustada")
    private Number calificacionAjustada;
    @NotNull(message="Se debe incluir el campo calificacionSiva2")
    private Number calificacionSiva2;
    @NotNull(message="Se debe incluir el campo gramaje")
    private Number gramaje;
    @NotNull(message="Se debe incluir el campo rango")
    private String rango;
    @NotNull(message="Se debe incluir el campo kilataje")
    private Number kilataje;
    private Number incremento;
    private String desplazamiento;
    @NotNull(message="Se debe incluir el campo ramo")
    private String ramo;
    @NotNull(message="Se debe incluir el campo subramo")
    private String subramo; 
}

package mx.com.nmp.partidas.model;
import javax.validation.constraints.NotNull;
import org.springframework.validation.annotation.Validated;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Validated
public class AlmacenarPartidaCandidatasRequest {
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
@NotNull(message="Se debe incluir el campo incremento")
private Number incremento;
@NotNull(message="Se debe incluir el campo desplazamiento")
private String desplazamiento;
@NotNull(message="Se debe incluir el campo ramo")
private String ramo;
@NotNull(message="Se debe incluir el campo subramo")
private String subramo;
}

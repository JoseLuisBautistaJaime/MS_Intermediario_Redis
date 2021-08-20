package mx.com.nmp.partidas.model;
import java.util.ArrayList;
import mx.com.nmp.partidas.entitys.Prendas;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecuperarPartidasCandidatasResponse {
private ControlExcepcion controlExcepcion;
private ArrayList<Prendas> listaPrendasAsociadas;
}

package mx.com.nmp.partidas.model;
import org.springframework.validation.annotation.Validated;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Validated
public class AlmacenarPartidaCandidatasResponse {
	private String code;
	private String status;
}

package mx.com.nmp.partidas.api;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import mx.com.nmp.partidas.model.AlmacenarPartidaCandidatasRequest;

public interface PartidasApi {    
    @ResponseBody ResponseEntity<Object>  postPartidasCandidatas( @RequestBody AlmacenarPartidaCandidatasRequest almacenarPartidaRequest,HttpServletRequest headers); 
}

package mx.com.nmp.partidas.api;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import mx.com.nmp.partidas.model.AlmacenarPartidaCandidatasRequest;

public interface PartidasApi {    
    @ResponseBody ResponseEntity<Object>  postPartidasCandidatas(@Valid @RequestBody AlmacenarPartidaCandidatasRequest almacenarPartidaRequest,HttpServletRequest headers); 
    @ResponseBody ResponseEntity<Object>  getRecuperarPartidas(@RequestParam(required = false) String id,HttpServletRequest headers);
}

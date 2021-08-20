package mx.com.nmp.partidas.controller;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;

import javax.servlet.http.HttpServletRequest;
import mx.com.nmp.partidas.api.PartidasApi;
import mx.com.nmp.partidas.exception.InvalidHeaderException;
import mx.com.nmp.partidas.model.AlmacenarPartidaCandidatasRequest;
import mx.com.nmp.partidas.model.AlmacenarPartidaCandidatasResponse;
import mx.com.nmp.partidas.model.RecuperarPartidasCandidatasRequest;
import mx.com.nmp.partidas.model.RecuperarPartidasCandidatasResponse;
import mx.com.nmp.partidas.services.IPartidasCandidatas;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

@RestController
@Validated
public class PartidasController implements PartidasApi{    

  private static final Logger log = LoggerFactory.getLogger(PartidasController.class);
  private static final String APPLICATIONJSON = "application/json";
  
  
  @ExceptionHandler
  public @ResponseBody ResponseEntity<Object> handleInvalidHeaderException(InvalidHeaderException exception){
    return new ResponseEntity<>(exception.invalidApiKey(), HttpStatus.UNAUTHORIZED);
  }

  @Autowired
  private IPartidasCandidatas partidaCandidatas;
  
    @PostMapping(path = "/infoprenda", consumes = APPLICATIONJSON, produces = APPLICATIONJSON)
    public @ResponseBody ResponseEntity<Object>  postPartidasCandidatas( @RequestBody AlmacenarPartidaCandidatasRequest almacenarPartidaRequest,HttpServletRequest headers){
        log.info("postPartidasCandidatas");
      
        AlmacenarPartidaCandidatasResponse response=  partidaCandidatas.almacenarPartida(almacenarPartidaRequest, headers);	
        return new ResponseEntity<>(response,HttpStatus.OK);
    } 

    @GetMapping(path = "/infoprenda",produces = APPLICATIONJSON)
    public @ResponseBody ResponseEntity<Object>  getRecuperarPartidas(@RequestParam(required = false) String id,HttpServletRequest headers){
      log.info("getRecuperarPartidas");
      RecuperarPartidasCandidatasRequest recuperarPartidasRequest =new RecuperarPartidasCandidatasRequest();
      log.info("id:{}",id);
      recuperarPartidasRequest.setId(id);
      RecuperarPartidasCandidatasResponse response =partidaCandidatas.recuperarPartidas(recuperarPartidasRequest, headers);
      return new ResponseEntity<>(response,HttpStatus.OK);
    }
}

package mx.com.nmp.partidas.services.imp;

import org.springframework.stereotype.Service;
import javax.servlet.http.HttpServletRequest;

import mx.com.nmp.partidas.entitys.ControlExcepcion;
import mx.com.nmp.partidas.model.AlmacenarPartidaCandidatasRequest;
import mx.com.nmp.partidas.model.AlmacenarPartidaCandidatasResponse;
import mx.com.nmp.partidas.model.RecuperarPartidasCandidatasRequest;
import mx.com.nmp.partidas.model.RecuperarPartidasCandidatasResponse;
import mx.com.nmp.partidas.services.IPartidasCandidatas;


@Service
public class PartidasCandidatasImpl implements IPartidasCandidatas{
    
    public AlmacenarPartidaCandidatasResponse  almacenarPartida(AlmacenarPartidaCandidatasRequest almacenarPartidaRequest, HttpServletRequest headers){
        AlmacenarPartidaCandidatasResponse response = new AlmacenarPartidaCandidatasResponse();
        response.setCode("NMP-API-REDIS-200");
        response.setStatus("SUCCESS");
        return response;
    }

    public  RecuperarPartidasCandidatasResponse recuperarPartidas(RecuperarPartidasCandidatasRequest recuperarPartidasRequest, HttpServletRequest headers){
        RecuperarPartidasCandidatasResponse response= new RecuperarPartidasCandidatasResponse();
        ControlExcepcion controlExcepcion= new ControlExcepcion();
        controlExcepcion.setCodigo("200");
        controlExcepcion.setMensaje("Resultado Exitoso");
        response.setControlExcepcion(controlExcepcion);
        return response; 
    } 

}

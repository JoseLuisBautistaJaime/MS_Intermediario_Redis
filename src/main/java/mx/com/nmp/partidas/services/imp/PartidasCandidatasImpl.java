package mx.com.nmp.partidas.services.imp;

import org.springframework.stereotype.Service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import mx.com.nmp.partidas.model.ControlExcepcion;
import mx.com.nmp.partidas.api.redis.repository.PartidaRepository;
import mx.com.nmp.partidas.entitys.Partida;
import mx.com.nmp.partidas.model.AlmacenarPartidaCandidatasRequest;
import mx.com.nmp.partidas.model.AlmacenarPartidaCandidatasResponse;
import mx.com.nmp.partidas.model.RecuperarPartidasCandidatasRequest;
import mx.com.nmp.partidas.model.RecuperarPartidasCandidatasResponse;
import mx.com.nmp.partidas.services.IPartidasCandidatas;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;


@Service
public class PartidasCandidatasImpl implements IPartidasCandidatas{
    private static final Logger log = LoggerFactory.getLogger(PartidasCandidatasImpl.class);

    @Autowired
    private PartidaRepository partidaRepository;

    public AlmacenarPartidaCandidatasResponse  almacenarPartida(AlmacenarPartidaCandidatasRequest almacenarPartidaRequest, HttpServletRequest headers){

        Partida partida = new AlmacenarPartidaCandidatasRequest();
        partidaRepository.save(partida);
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

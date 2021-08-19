package mx.com.nmp.partidas.services;
import javax.servlet.http.HttpServletRequest;
import mx.com.nmp.partidas.model.AlmacenarPartidaCandidatasRequest;
import mx.com.nmp.partidas.model.AlmacenarPartidaCandidatasResponse;
import mx.com.nmp.partidas.model.RecuperarPartidasCandidatasRequest;
import mx.com.nmp.partidas.model.RecuperarPartidasCandidatasResponse;

public interface IPartidasCandidatas {
    public AlmacenarPartidaCandidatasResponse  almacenarPartida(AlmacenarPartidaCandidatasRequest almacenarPartidaRequest, HttpServletRequest headers);
    public RecuperarPartidasCandidatasResponse recuperarPartidas(RecuperarPartidasCandidatasRequest recuperarPartidasRequest, HttpServletRequest headers);  
}

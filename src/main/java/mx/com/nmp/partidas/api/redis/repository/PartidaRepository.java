package mx.com.nmp.partidas.api.redis.repository;


import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import mx.com.nmp.partidas.entitys.Partida;

@Repository
public interface PartidaRepository extends CrudRepository<Partida, String> {
    List<Partida> findByNivelCliente(String nivelCliente);
}

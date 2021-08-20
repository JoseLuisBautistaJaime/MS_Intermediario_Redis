package mx.com.nmp.partidas.component;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Component
public class Propiedades {
    @Value("${mx.com.nmp.api.redis.host}")
    private String hostRedis;
    @Value("${mx.com.nmp.api.redis.port}")
    private String portRedis;  
}

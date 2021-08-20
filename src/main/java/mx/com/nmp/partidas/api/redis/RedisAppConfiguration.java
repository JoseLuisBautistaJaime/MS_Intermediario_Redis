package mx.com.nmp.partidas.api.redis;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;

/*
@Configuration
@EnableAutoConfiguration(exclude = {
    RedisAutoConfiguration.class
})
*/
public class RedisAppConfiguration {
/*
    @Bean
    public JedisConnectionFactory jedisConnectionFactory() {
        final JedisConnectionFactory cf = new JedisConnectionFactory();
        cf.setHostName("localhost");
        cf.setPort(6379);
        return cf;
    }

    @Bean
    public RedisTemplate<String,Object> redisTemplate() {
        final RedisTemplate<String,Object> template = new RedisTemplate<String,Object>();
        template.setConnectionFactory(jedisConnectionFactory());
        return template;
    }
*/    
}

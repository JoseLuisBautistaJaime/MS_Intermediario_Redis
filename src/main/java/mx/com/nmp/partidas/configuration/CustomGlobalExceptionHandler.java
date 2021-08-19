package mx.com.nmp.partidas.configuration;
import org.slf4j.Logger;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingRequestHeaderException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import javax.validation.ConstraintViolationException;
import java.net.ConnectException;
import java.net.UnknownHostException;

@ControllerAdvice
public class CustomGlobalExceptionHandler extends ResponseEntityExceptionHandler {
	private String invalidItem = "Elemento invalido en peticion";
    Logger log = org.slf4j.LoggerFactory.getLogger(this.getClass());
    
	@ExceptionHandler(value = ConnectException.class)
	protected ResponseEntity<Object> connectException(ConnectException excepcion) {	 
		ApiError apiError = new ApiError();
		log.error("Error Handler ConnectException: {}", excepcion.getMessage());
	    return new ResponseEntity<>( apiError.connectTimeOut() , HttpStatus.REQUEST_TIMEOUT);
	}
	
	@Override
	protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(
	  HttpRequestMethodNotSupportedException excepcion, 
	  HttpHeaders headers, 
	  HttpStatus status, 
	  WebRequest peticion) {
		log.info("-->handleHttpRequestMethodNotSupported:{}",peticion);	
		log.error("Error Handler HttpRequestMethodNotSupportedException: {}", excepcion.getMessage());
	    ApiError apiError = new ApiError();
	    return new ResponseEntity<>( apiError.methodNotAllowed() , HttpStatus.METHOD_NOT_ALLOWED);
	}

	@ExceptionHandler(ConstraintViolationException.class)
    protected ResponseEntity<Object> handleConstraintViolation(ConstraintViolationException excepcion,
            HttpHeaders cabeceras) {
		ApiError apiError = new ApiError();		
		log.error("Error Handler ConstraintViolationException: {}",excepcion.getMessage());		
		String mensaje= excepcion.getCause().toString();
        return new ResponseEntity<>(apiError.badResquest(mensaje), cabeceras,HttpStatus.BAD_REQUEST);
    }
	
	@ExceptionHandler(UnknownHostException.class)
	public ResponseEntity<Object> handleHostException(UnknownHostException excepcion) {		
		log.error("Error Handler UnknownHostException: {}",excepcion.getMessage());
		ApiError apiError = new ApiError();
		return new ResponseEntity<>(apiError.internalServerError(), HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ExceptionHandler(HttpServerErrorException.InternalServerError.class)    
	protected ResponseEntity<Object> handleHttpInternalServerException(HttpServerErrorException.InternalServerError excepcion,
	WebRequest peticion) {
		log.info("-->HttpServerErrorException.InternalServerError:{}",peticion);	
		log.error("Error Handler HttpServerErrorException.InternalServerError: {}",excepcion.getMessage());
		ApiError apiError = new ApiError();
		return new ResponseEntity<>(apiError.internalServerError(), HttpStatus.INTERNAL_SERVER_ERROR);
    }


	@ExceptionHandler(HttpClientErrorException.Unauthorized.class)
    protected ResponseEntity<Object> handleHttpClientErrorException(HttpClientErrorException.Unauthorized excepcion,
                    WebRequest peticion) {
		log.info("-->HttpClientErrorException.Unauthorized:{}",peticion);	
		log.error("Error Handler HttpClientErrorException.Unauthorized: {}",excepcion.getMessage());
		ApiError apiError = new ApiError();
		return new ResponseEntity<>(apiError.invalidAutorization(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
	
	@ExceptionHandler(HttpClientErrorException.BadRequest.class)
    protected ResponseEntity<Object> handleHttpClientErrorException(HttpClientErrorException.BadRequest excepcion,
            WebRequest peticion) {
		log.info("-->{}",peticion);	
		log.error("Error Handler HttpClientErrorException.BadRequest: {}",excepcion.getMessage());
		ApiError apiError = new ApiError();
		return new ResponseEntity<>( apiError.badResquest(invalidItem) , HttpStatus.BAD_REQUEST);
    }
	
    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException excepcion,
            HttpHeaders cabeceras, HttpStatus estado, WebRequest peticion) {
		ApiError apiError = new ApiError();
		log.info("-->HttpMessageNotReadableException:{}",peticion);	
		log.error("Peticion mal formada:Error Handler HttpMessageNotReadableException: {}",excepcion.getMessage());
		String mensaje= excepcion.getCause().toString();
	    return new ResponseEntity<>( apiError.badResquest(mensaje), HttpStatus.BAD_REQUEST);
    }
    
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException excepcion,
            HttpHeaders cabeceras, HttpStatus estado, WebRequest peticion) {
			ApiError apiError = new ApiError();
			log.info("-->HttpMessageMethodArgumentNotValidException:{}",peticion);	
			log.error("Peticion mal formada:Error Handler MethodArgumentNotValidException: {}",excepcion.getMessage());
			String mensaje= excepcion.getCause().toString();
        return new ResponseEntity<>( apiError.badResquest(mensaje), HttpStatus.BAD_REQUEST);
    }

	 @ExceptionHandler(HttpClientErrorException.class)
	 protected ResponseEntity<Object> handleHttpClientErrorException(HttpClientErrorException excepcion,
	            WebRequest peticion) {	
			log.info("-->HttpClientErrorException:{}",peticion);	
			log.error("Error Handler HttpClientErrorException: {}",excepcion.getMessage());
			ApiError apiError = new ApiError();
            String mensaje =  excepcion.getMessage();
			return new ResponseEntity<>( apiError.conflictResquest(mensaje) , HttpStatus.CONFLICT);
	 }

	@ExceptionHandler(MissingRequestHeaderException.class)
	    protected ResponseEntity<Object> handleMissingRequestHeaderException(MissingRequestHeaderException excepcion,
	            WebRequest peticion) {
		log.info("-->MissingRequestHeaderException:{}",peticion);	
		log.error("Error Handler MissingRequestHeaderException: {}",excepcion.getMessage());
		ApiError apiError = new ApiError();
		return new ResponseEntity<>( apiError.badResquest(invalidItem) , HttpStatus.BAD_REQUEST);
	}

}
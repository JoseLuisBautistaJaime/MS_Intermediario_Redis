package mx.com.nmp.partidas.configuration;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiError {
    private String code;
	private String message;
    private String badReqCode = "NMP-API-REDIS-400";
	         
    public ApiError() {}
    public ApiError(String code,String message) {
    	super();
    	this.code = code;
		this.message = message;
    }
    public ApiError methodNotAllowed() {
        this.code = "NMP-API-REDIS-405";
		this.message = "Metodo no soportado";
		return this;
    }
	
	public ApiError notFound() {
        this.code = "NMP-API-REDIS-404";
		this.message = "No se encontraron resultados";
		return this;
	}
	
	public ApiError badResquest() {
        this.code =  "NMP-API-REDIS-400";
		this.message = "La solicitud no se encuentra bien formada";
		return this;
	}
	
	public ApiError badResquest(String mensaje) {
        this.code = badReqCode;
		this.message = mensaje;
		return this;
	}
	
	public ApiError conflictResquest(String mensaje) {
        this.code = "NMP-API-REDIS-409";
		this.message = mensaje;
		return this;
    }

	public ApiError faultHeaders() {
        this.code = badReqCode;
		this.message = "Hacen falta headers en la peticion.";
		return this;
    }

	public ApiError unsupportedMediaType() {
        this.code = "NMP-API-REDIS-415";
		this.message = "Tipo de contenido no soportado.";
		return this;
    }
	
	public ApiError invalidAutorization() {
        this.code = "NMP-API-REDIS-401";
		this.message = "Se ha producido un error de autorización";
		return this;
    }

    public ApiError forbiddenAutorization() {
        this.code = "NMP-API-REDIS-403";
		this.message = "Se ha producido un error de autorización";
		return this;
    }
    

	public ApiError connectTimeOut() {
        this.code = "NMP-API-REDIS-408";
		this.message = "Ocurrio un error de conexion.";
		return this;
    }
	public ApiError internalServerError() {
        this.code = "NMP-API-REDIS-500";
		this.message = "Error interno del servidor.";
		return this;
    }
}

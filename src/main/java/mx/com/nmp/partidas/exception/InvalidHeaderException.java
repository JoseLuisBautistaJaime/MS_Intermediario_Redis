package mx.com.nmp.partidas.exception;

import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

public class InvalidHeaderException extends RuntimeException {
	private static final long serialVersionUID = 1L;
	private final String code;
	private final String message;    
   
    public InvalidHeaderException(String codigo, String desc){
        this.code=codigo;
        this.message=desc;      
    }
    
    public Object invalidApiKey(){
    	Map<String, String> errorObject = new HashMap<>();
    	errorObject.put("code", this.getCode());
    	errorObject.put("message", this.message);
    	  	
        return new TreeMap<>(errorObject);
    }

	public String getCode() {
		return code;
	}
    @Override
	public String getMessage() {
		return message;
	} 
}

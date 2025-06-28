import { HttpClient } from "@angular/common/http";
import {inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { Usuario } from "../../../modules/login/interfaces/usuario.interface";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    http = inject(HttpClient);

    createUsuario(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(`${environment.api_url}/login/signup`, usuario);
    }

    login(email: string, contraseña: string): Observable<Usuario> {
        return this.http.post<Usuario>(`${environment.api_url}/login/signin`, { email, contraseña });
      } 
}

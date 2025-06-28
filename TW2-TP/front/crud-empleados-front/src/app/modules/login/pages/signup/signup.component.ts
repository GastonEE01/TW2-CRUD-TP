// src/app/modules/login/pages/signup/signup.component.ts
import { Component, inject } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { MessageService } from "primeng/api";
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { LoginService } from "../../../../api/services/login/login.service";
import { FormSignupComponent } from "../../components/form-signup/form-signup.component";
import { Usuario } from "../../interfaces/usuario.interface";

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [Toast, FormSignupComponent, ButtonModule, RouterModule],
    providers: [MessageService],
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent {
    private router = inject(Router);
    private messageService = inject(MessageService);
    private loginService = inject(LoginService);

    onSignup(usuario: Usuario) {
        this.loginService.createUsuario(usuario).subscribe({
            next: (usuario: any) => {
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario registrado exitosamente' });
                this.router.navigate(['/login']);
            },
            error: (error: any) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
            }
        });
    }
}
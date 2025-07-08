// src/app/modules/login/pages/login/login.component.ts
import { Component, inject } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { MessageService } from "primeng/api";
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { LoginService } from "../../../../api/services/login/login.service";
import { FormLoginComponent } from "../../components/form-login/form-login.component";
import { LocalStorageService } from "../../../../api/services/localStorage/localStorage.service";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [Toast, FormLoginComponent, ButtonModule, RouterModule],
    providers: [MessageService],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    private router = inject(Router);
    private messageService = inject(MessageService);
    private loginService = inject(LoginService);
    private localStorageService = inject(LocalStorageService);

    onLogin(credentials: { email: string; contraseña: string }) {
        this.loginService.login(credentials.email, credentials.contraseña).subscribe({
            next: (usuario: any) => {
                this.localStorageService.setUsuario(usuario);
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Login exitoso' });
                this.router.navigate(['/home']);
            },
            error: (error: any) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
            }
        });
    }
}
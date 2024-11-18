import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AtualizarDadosComponent } from './atualizar-dados.component';
import { UserService } from '../../../services/user.service';
import { of } from 'rxjs';

describe('AtualizarDadosComponent', () => {
  let component: AtualizarDadosComponent;
  let fixture: ComponentFixture<AtualizarDadosComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', ['atualizarDadosUsuario']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule, // Necessário para formulários reativos
        ToastrModule.forRoot(), // Para usar Toastr no componente
        AtualizarDadosComponent
      ],
      providers: [
        { provide: UserService, useValue: spy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtualizarDadosComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when fields are empty', () => {
    expect(component.atualizarDadosForm.valid).toBeFalsy();
  });

  it('should have a valid form when all fields are filled correctly', () => {
    component.atualizarDadosForm.controls['name'].setValue('Test User');
    component.atualizarDadosForm.controls['username'].setValue('testuser');
    component.atualizarDadosForm.controls['password'].setValue('password123');
    expect(component.atualizarDadosForm.valid).toBeTruthy();
  });

  it('should call userService to update user data when form is valid and submitted', () => {
    const mockToken = 'mockToken';
    localStorage.setItem('authToken', mockToken); // Set mock token
    userServiceSpy.atualizarDadosUsuario.and.returnValue(of({})); // Mock response

    component.atualizarDadosForm.controls['name'].setValue('Test User');
    component.atualizarDadosForm.controls['username'].setValue('testuser');
    component.atualizarDadosForm.controls['password'].setValue('password123');

    component.onSubmit();
    expect(userServiceSpy.atualizarDadosUsuario).toHaveBeenCalledWith(component.atualizarDadosForm.value, mockToken);
  });
});

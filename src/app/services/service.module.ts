import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';



import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  LoginGuardGuard,
  SubirArchivoService,
  ModalUploadService,
  HospitalService,
  MedicoService,
  TerceroService,
  ConductorService
} from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService,
    TerceroService,
    ConductorService
  ],
  declarations: []
})
export class ServiceModule { }

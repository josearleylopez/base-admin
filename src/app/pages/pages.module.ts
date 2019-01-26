import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { PAGES_ROUTES } from './pages.routes';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { TercerosComponent } from './terceros/terceros.component';
import { TerceroComponent } from './terceros/tercero.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { ConductoresComponent } from './conductores/conductores.component';
import { CentrosCostoComponent } from './centros-costo/centros-costo.component';
import { CentroCostoComponent } from './centros-costo/centro-costo.component';
import { ProgramasComponent } from './programas/programas.component';
import { RutasComponent } from './rutas/rutas.component';
import { VehiculoComponent } from './vehiculos/vehiculo.component';
import { ConductorComponent } from './conductores/conductor.component';
import { RutaComponent } from './rutas/ruta.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
    IncrementadorComponent,
    GraficoDonaComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent,
    UsuariosComponent,
    ModalUploadComponent,
    HospitalesComponent,
    MedicosComponent,
    MedicoComponent,
    BusquedaComponent,
    TercerosComponent,
    TerceroComponent,
    VehiculosComponent,
    ConductoresComponent,
    CentrosCostoComponent,
    CentroCostoComponent,
    ProgramasComponent,
    RutasComponent,
    VehiculoComponent,
    ConductorComponent,
    RutaComponent,
  ],
  exports : [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent
  ],
  imports : [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    PipesModule,
    CommonModule,
    PAGES_ROUTES
  ]
})

export class PagesModule { }

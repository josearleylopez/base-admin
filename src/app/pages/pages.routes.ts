import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { TercerosComponent } from './terceros/terceros.component';
import { TerceroComponent } from './terceros/tercero.component';
import { ConductoresComponent } from './conductores/conductores.component';
import { ConductorComponent } from './conductores/conductor.component';
import { RutasComponent } from './rutas/rutas.component';
import { RutaComponent } from './rutas/ruta.component';
import { CentrosCostoComponent } from './centros-costo/centros-costo.component';
import { CentroCostoComponent } from './centros-costo/centro-costo.component';
import { ProgramasComponent } from './programas/programas.component';
import { VehiculoComponent } from './vehiculos/vehiculo.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';


const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children : [
      { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
      { path: 'progress', component: ProgressComponent, data: {titulo: 'Barras Progreso'} },
      { path: 'graficas1', component: Graficas1Component, data: {titulo: 'Graficas'} },
      { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'} },
      { path: 'rxjs', component: RxjsComponent, data: {titulo: 'RXJS'} },
      { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Configuraciones Usuario'} },
      { path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil Usuario'} },
      { path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Buscador'} },

      // Mantenimientos
      { path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Matenimiento de Usuarios'} },
      { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Matenimiento de Hospitales'} },
      { path: 'medicos', component: MedicosComponent, data: {titulo: 'Matenimiento de Médicos'} },
      { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Actualizar Médico'} },
      { path: 'terceros', component: TercerosComponent, data: {titulo: 'Matenimiento de Terceros'} },
      { path: 'tercero/:id', component: TerceroComponent, data: {titulo: 'Actualizar Tercero'} },
      { path: 'conductores', component: ConductoresComponent, data: {titulo: 'Matenimiento de Conductores'} },
      { path: 'conductor/:id', component: ConductorComponent, data: {titulo: 'Actualizar Conductor'} },
      { path: 'vehiculos', component: VehiculosComponent, data: {titulo: 'Matenimiento de Vehiculos'} },
      { path: 'vehiculo/:id', component: VehiculoComponent, data: {titulo: 'Actualizar Vehiculo'} },
      { path: 'rutas', component: RutasComponent, data: {titulo: 'Matenimiento de Rutas'} },
      { path: 'ruta/:id', component: RutaComponent, data: {titulo: 'Actualizar Ruta'} },
      { path: 'centros-costo', component: CentrosCostoComponent, data: {titulo: 'Matenimiento de Centros de Costo'} },
      { path: 'centro-costo/:id', component: CentroCostoComponent, data: {titulo: 'Actualizar Centro Costo'} },
      { path: 'programas', component: ProgramasComponent, data: {titulo: 'Matenimiento de Centros de Costo'} },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    ]},
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);

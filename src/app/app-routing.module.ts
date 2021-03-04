import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'start',
    loadChildren: () => import('./start/start.module').then( m => m.StartPageModule)
  },
  {
    path: 'busqueda',
    loadChildren: () => import('./busqueda/busqueda.module').then( m => m.BusquedaPageModule)
  },
  {
    path: 'historial-reportes',
    loadChildren: () => import('./historial-reportes/historial-reportes.module').then( m => m.HistorialReportesPageModule)
  },
 
  {
    path: 'fotos',
    loadChildren: () => import('./fotos/fotos.module').then( m => m.FotosPageModule)
  },
  {
    path: 'historial-tractos',
    loadChildren: () => import('./historial-tractos/historial-tractos.module').then( m => m.HistorialTractosPageModule)
  },
 
  {
    path: 'nuevo-reporte',
    loadChildren: () => import('./nuevo-reporte/nuevo-reporte.module').then( m => m.NuevoReportePageModule)
  },
  {
    path: 'administracion',
    loadChildren: () => import('./administracion/administracion.module').then( m => m.AdministracionPageModule)
  },
  {
    path: 'actualizar-art',
    loadChildren: () => import('./actualizar-art/actualizar-art.module').then( m => m.ActualizarArtPageModule)
  },
  {
    path: 'inicio-administracion',
    loadChildren: () => import('./inicio-administracion/inicio-administracion.module').then( m => m.InicioAdministracionPageModule)
  },
  {
    path: 'nuevainspeccion',
    loadChildren: () => import('./nuevainspeccion/nuevainspeccion.module').then( m => m.NuevainspeccionPageModule)
  },
  {
    path: 'tipoestado',
    loadChildren: () => import('./tipoestado/tipoestado.module').then( m => m.TipoestadoPageModule)
  },
  {
    path: 'agregar-art',
    loadChildren: () => import('./agregar-art/agregar-art.module').then( m => m.AgregarArtPageModule)
  },  {
    path: 'actualizar-tipo-estado',
    loadChildren: () => import('./actualizar-tipo-estado/actualizar-tipo-estado.module').then( m => m.ActualizarTipoEstadoPageModule)
  },




 



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

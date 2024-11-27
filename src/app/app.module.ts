import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar esto
import { AppComponent } from './app.component';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { GeneroComponent } from './components/Genero/genero.component';

@NgModule({
  declarations: [
    AppComponent,
    ContenidoComponent,
    // Otros componentes
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, // Asegúrate de que esto esté aquí
    // Otros módulos
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

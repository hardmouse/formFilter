import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterActionComponent } from './components/footer-action/footer-action.component';
import { MainComponent } from './components/main/main.component';
import { SearchTableComponent } from './components/search-table/search-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { DataService } from './services/data.service';
import { ToastsComponent } from './components/toasts/toasts.component';
import { ModalComponent } from './components/modal/modal.component';
import { ComboBoxComponent } from './components/combo-box/combo-box.component';
import { PipesModule } from './services/pipes/pipes.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterActionComponent,
    MainComponent,
    SearchTableComponent,
    ToastsComponent,
    ModalComponent,
    ComboBoxComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    PipesModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

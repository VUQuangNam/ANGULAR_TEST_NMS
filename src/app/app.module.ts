import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CreateBaseModule } from './common/create/create.component';
import { FilterBaseModule } from './common/filter/filter.component';
import { TableBaseModule } from './common/table/table.component';
import { AccountService } from './core/services/account.service';
import { fakeBackendProvider } from './core/services/fake-backend';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FilterBaseModule,
    TableBaseModule,
    CreateBaseModule,
    CommonModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    AccountService,
    fakeBackendProvider
  ]
})
export class AppModule {
}

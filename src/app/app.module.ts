import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
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
    TableBaseModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    // provider used to create fake backend,
    AccountService,
    fakeBackendProvider
  ]
})
export class AppModule {
}

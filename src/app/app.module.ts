import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { pt_BR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { LoginModule } from './login/login.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './core/services/auth/auth.module';
import { AUTH_OPTIONS } from './core/services/auth/configuration/auth-configuration';
import { EndpointsService } from './core/services/endpoints/endpoints.service';
import { AuthenticationConfigurationFactory } from './app.configuration';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MenuComponent } from './menu/menu.component';

registerLocaleData(pt);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule.forRoot(),
    AuthModule.forRoot({
      AuthConfigurationProvider: {
        provide: AUTH_OPTIONS,
        useFactory: AuthenticationConfigurationFactory,
        deps: [EndpointsService]
      }
    }),
    IconsProviderModule,    
    NzLayoutModule,
    NzMenuModule,
    NzDropDownModule,
    NzButtonModule,
    NzAvatarModule,
    NzIconModule,
    LoginModule
  ],
  providers: [{ provide: NZ_I18N, useValue: pt_BR }],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { LoadingModule } from './components/uv-loading/loading.module';
import { AuthGuard } from './guards/auth-guard';
import { LoginGuard } from './guards/login-guard';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { AuthModule } from './services/auth/auth.module';

@NgModule({
    imports: [
        LoadingModule
    ],
    exports: []
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }

    static forRoot(): ModuleWithProviders<CoreModule> {
        return {
            ngModule: CoreModule,
            providers: [
                AuthGuard,
                LoginGuard
            ]
        };
    }
}


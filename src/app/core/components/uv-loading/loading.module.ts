import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading.component';
import { LoadingService } from './loading.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
    imports: [
        CommonModule,
        NzSpinModule,
        NzIconModule
    ],
    exports: [LoadingComponent],
    declarations: [LoadingComponent],
    providers: [LoadingService],
    entryComponents: [LoadingComponent]
})
export class LoadingModule { }

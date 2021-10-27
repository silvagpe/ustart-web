import { Injectable, ComponentFactoryResolver, Injector, Inject, ComponentRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LoadingComponent } from './loading.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loaderInstance: ComponentRef<LoadingComponent>;

  constructor(
    private factoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document) {
    this.factoryResolver = factoryResolver;
  }

  public show(message: string = 'Aguarde...'): void {
    if (this.loaderInstance) {
      return;
    }

    const factory = this.factoryResolver.resolveComponentFactory(LoadingComponent);

    const componentRef = factory.create(this.injector);
    componentRef.instance.message = message;
    this.loaderInstance = componentRef;

    componentRef.hostView.detectChanges();
    componentRef.changeDetectorRef.detectChanges();

    const { nativeElement } = componentRef.location;
    this.document.body.appendChild(nativeElement);
  }

  public dismiss(): void {
    if (this.loaderInstance) {
      this.loaderInstance.destroy();
      const { nativeElement } = this.loaderInstance.location;
      this.document.body.removeChild(nativeElement);
      this.loaderInstance = null;
    }
  }
}

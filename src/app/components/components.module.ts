import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from './page-title/page-title.component';
import { MaterialModule } from '../modules/material.module';
import { LoggedContainerComponent } from './logged-container/logged-container.component';

@NgModule({
  declarations: [
    PageTitleComponent,
    LoggedContainerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    PageTitleComponent,
    LoggedContainerComponent
  ]
})
export class ComponentsModule { }

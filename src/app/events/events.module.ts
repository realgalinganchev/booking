import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EventsRoutingModule } from './events-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EventsRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
  ]
})
export class EventsModule { }

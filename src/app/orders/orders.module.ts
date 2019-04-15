import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { OrdersRoutingModule } from "./orders-routing.module";
import { OrdersComponent } from "./orders.component";
import { SharedModule } from "../shared/shared.module";
import { OrdersEditComponent } from './orders-edit/orders-edit.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        OrdersRoutingModule,
        SharedModule
    ],
    declarations: [
        OrdersComponent,
        OrdersEditComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class OrdersModule { }

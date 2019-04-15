import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { OrdersComponent } from "./orders.component";

const routes: Routes = [
    { path: "", component: OrdersComponent }
]

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class OrdersRoutingModule { }

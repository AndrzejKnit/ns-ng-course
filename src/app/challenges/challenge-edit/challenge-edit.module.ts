import { NgModule } from "@angular/core";
import { ChallengeEditComponent } from "./challenge-edit.component";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { SharedModule } from "~/app/shared/shared.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";

@NgModule({
    declarations: [ChallengeEditComponent],
    imports: [
        NativeScriptCommonModule,
        //NativeScriptRouterModule,
        NativeScriptRouterModule.forChild([
            { path: '', component: ChallengeEditComponent}]),
        SharedModule
    ]
})
export class ChallengeEditModule {}

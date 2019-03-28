import { NgModule } from "@angular/core";
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { ChallengesRoutingModule } from "./challenges-routing.module";
import { ChallengeEditComponent } from "./challenge-edit/challenge-edit.component";
import { ChallengeTabsComponent } from "./challenge-tabs/challenge-tabs.component";
import { CurrentChallengeComponent } from "./current-challenge/current-challenge.component";
import { TodayComponent } from "./today/today.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        ChallengeEditComponent,
        ChallengeTabsComponent,
        CurrentChallengeComponent,
        TodayComponent
    ],
    imports: [
        NativeScriptCommonModule,
        ChallengesRoutingModule,
        SharedModule
    ]
})
export class ChallengesModule { }

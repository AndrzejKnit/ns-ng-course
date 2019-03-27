import { Component } from "@angular/core";
import { RouterExtensions } from 'nativescript-angular/router';

import { Page } from "tns-core-modules/ui/page/page";

declare var android: any;

@Component({
    selector: 'ns-current-challenge',
    templateUrl: './current-challenge.component.html',
    styleUrls: ['./current-challenge.component.css'],
    moduleId: module.id
})
export class CurrentChallengeComponent {

    constructor(private router: RouterExtensions) { }

    onChallengeEdit() {
        this.router.navigate(['/challenges/edit'], {transition: {name: 'slideLeft'}});
    }


}

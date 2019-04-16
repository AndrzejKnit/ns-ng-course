import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef, ViewContainerRef } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { Subscription } from "rxjs";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { UIService } from "./shared/ui/ui.service";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";
import { AuthService } from "./auth/auth.service";




@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(RadSideDrawerComponent) drawerComponent: RadSideDrawerComponent;
    activeChallenge = '';
    private drawerSub: Subscription;
    private drawer: RadSideDrawer;
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(
        private uiService: UIService,
        private changeDetectionRef: ChangeDetectorRef,
        private vcRef: ViewContainerRef,
        private authService: AuthService,
        private router: Router, private routerExtensions: RouterExtensions
        ) {}

    ngOnInit() {
        this.drawerSub =  this.uiService.drawerState.subscribe(()=> {
            if (this.drawer) {
                this.drawer.toggleDrawerState();
            }
         });
         this.uiService.setRootVCRef(this.vcRef);
    }
    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }
    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }

    ngAfterViewInit() {
       this.drawer = this.drawerComponent.sideDrawer;
        this.changeDetectionRef.detectChanges();
    }

    onChallengeInput(challengeDescription: string) {
        this.activeChallenge = challengeDescription;
        console.log('onChallengeInput: ', challengeDescription);
    }

    onLogout() {
        this.uiService.toggleDrawer();
        this.authService.logout();
        }

    ngOnDestroy() {
        if (this.drawerSub) {
            this.drawerSub.unsubscribe();
        }
    }


 }

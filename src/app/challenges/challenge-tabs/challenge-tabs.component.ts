import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page/page';
import { ChallengeService } from '../challenges.service';

@Component({
  selector: 'ns-challenge-tabs',
  templateUrl: './challenge-tabs.component.html',
  styleUrls: ['./challenge-tabs.component.css'],
  moduleId: module.id,
})
export class ChallengeTabsComponent implements OnInit {
    isLoading = false;

  constructor(
    private router: RouterExtensions,
    private active: ActivatedRoute,
    private page: Page,
    private challengeService: ChallengeService
    ) { }

  ngOnInit() {
      this.isLoading = true;
      this.challengeService.fetchCurrentChallenge().subscribe(res => {
          console.log('Fetched chalenge...');
          this.isLoading = false;
          this.loadedTabRouters();
      }, err => {
          console.log(err);
          this.isLoading = false;
          this.loadedTabRouters();
      });
    this.page.actionBarHidden = true;
  }
private loadedTabRouters() {
    setTimeout(() => {
        this.router.navigate(
                            [
                                {
                                    outlets: {currentChallenge: ['current-challenge'], today: ['today']}
                                }
                            ],
                        {
                            relativeTo: this.active
                        }
                        );
    }, 10);
      }
}

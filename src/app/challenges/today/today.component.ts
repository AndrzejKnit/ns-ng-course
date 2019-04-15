import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { RouterExtensions } from 'nativescript-angular/router';
import { ChallengeService } from '../challenges.service';
import { Day, DayStatus } from '../day.model';

@Component({
  selector: 'ns-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
  moduleId: module.id,
})
export class TodayComponent implements OnInit, OnDestroy {
    currentDay: Day;
    private curChallengeSub: Subscription;

  constructor(
        private router: RouterExtensions,
        private challengeService: ChallengeService
      ) { }

  ngOnInit() {
      this.challengeService.currentChallenge.subscribe(challenge => {
          if (challenge) {
            this.currentDay = challenge.currentDay;
          }

      });
  }

  onActionSelected(action: DayStatus) {
      this.challengeService.updateDayStatus(this.currentDay.dayInMonth, action);
  }

  getActionName() {
      if (this.currentDay.status === DayStatus.Completed) {
          return 'complete';
      }
      if (this.currentDay.status === DayStatus.Failed) {
          return 'fail';
      }
  }

  onCurrentChallenge() {
    this.router.navigate(['/current-challenge'], {transition: {name:'slideLeft'}});
  }

  ngOnDestroy() {
      if (this.curChallengeSub) {
          this.curChallengeSub.unsubscribe();
      }
  }

}

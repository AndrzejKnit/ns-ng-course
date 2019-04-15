import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { take, tap } from "rxjs/operators";
import { Challenge } from "./challenge.model";
import { DayStatus, Day } from "./day.model";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class ChallengeService {
    private _currentChallenge = new BehaviorSubject<Challenge>(null);

    constructor(private http: HttpClient) {

    }

    get currentChallenge() {
        return this._currentChallenge.asObservable();
    }

    fetchCurrentChallenge() {
        return this.http.get<{title: string, description: string, month: number, year: number, _days: Day[]}>('https://ns-ng-course-98db2.firebaseio.com/challenge.json')
        .pipe(tap(resData => {
            if (resData) {
                const loadedChallenge = new Challenge(
                    resData.title,
                    resData.description,
                    resData.year,
                    resData.month,
                    resData._days
                    );
                    this._currentChallenge.next(loadedChallenge);
            }
        })
        );
    }

   createNewChallenge(title: string, description: string) {
    const newChallenge = new Challenge(title, description, new Date().getFullYear(), new Date().getMonth());

    this.http.put('https://ns-ng-course-98db2.firebaseio.com/challenge.json', newChallenge).subscribe(res => {
        console.log(res);
    });
    this._currentChallenge.next(newChallenge);
   }

   updateChallenge(title: string, description: string) {
       this._currentChallenge.pipe(take(1)).subscribe(challenge => {
        const updatedChallenge = new Challenge(
                title,
                description,
                challenge.year,
                challenge.month,
                challenge.days
                );
                //Send to a server
                this._currentChallenge.next(updatedChallenge);
       });
   }

   updateDayStatus(dayInMonth: number, status:  DayStatus) {
        this._currentChallenge.pipe(take(1)).subscribe(challenge => {
            if (!challenge || challenge.days.length < dayInMonth) {
                return;
            }
            const dayIndex = challenge.days.findIndex(d => d.dayInMonth === dayInMonth);
            challenge.days[dayIndex].status = status;
            this._currentChallenge.next(challenge);
            console.log(challenge.days[dayIndex]);
            // Save this to a server
        });
   }
}

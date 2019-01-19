import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import { BarsModel } from 'src/models/bars';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Progress Bars Demo';
  endPoint: BarsModel;
  buttons: number[];
  bars: number[];
  limit: number;
  httpGetEndPointService$: Subscription;
  buttonAmont: number; //if the amount of buttons are greater than 4, relocated all buttons to a single line. 
  widthArray: number[]; // used to change the width of the selected bar
  colorArray: string[]; // used to change the color of the selected bar if the calculated width is greater than the limit
  selectedBar: number; // the index of the current select element in the array of widthArray or colorArray. can be used to find the selected bar

  constructor(
    private httpService: HttpService,
    ) {}

  ngOnInit():void{
    //receiving the endpoint data returned from API
    this.httpService.GetEndPoint().subscribe((res:BarsModel) =>{

      /*
      //used to test if the amount of buttons are greater than 4.
      // this.endPoint = {"buttons":[28,8,-28,-35, 33, 34],"bars":[56,23,23,23,50],"limit":140}
      // res = this.endPoint;
      */

        this.endPoint = res;
        this.buttons = res.buttons;
        this.bars = res.bars;
        this.limit = res.limit;
      },
      (error: any) => { console.error(error) },
      () =>{
        //codes should be executed after the completion of the API call
        this.selectedBar = 0;
        this.buttonAmont = this.buttons.length;
        const widthClonedArray = Object.assign([], this.bars);
        this.widthArray = widthClonedArray;
        this.colorArray = Array(this.widthArray.length).fill(null).map((u, i) => "#28a745")
      }
    );
  }

  ngOnDestroy(): void {
    this.httpGetEndPointService$.unsubscribe();
  }

  aniamteProgressBar(buttonValue:number){
    if(this.selectedBar != null){
      this.widthArray[this.selectedBar] += buttonValue;

      if(this.widthArray[this.selectedBar] > this.limit){
        //animate the selected bar to the danger color
        this.colorArray[this.selectedBar] = "#dc3545";
      }else{
        this.colorArray[this.selectedBar] = "#28a745";
      }
  
      if(this.widthArray[this.selectedBar] < 0){
        //0 is the minimum value of width
        this.widthArray[this.selectedBar] = 0;
      }
  
    }
  }
  
}

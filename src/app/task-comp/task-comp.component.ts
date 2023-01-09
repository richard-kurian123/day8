import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/internal/operators/filter';
import { DataService } from '../data.service';

@Component({
  selector: 'app-task-comp',
  templateUrl: './task-comp.component.html',
  styleUrls: ['./task-comp.component.scss']
})
export class TaskCompComponent implements OnInit {


  public firstArray:any=[];
  public secondObj:any;

  public secondArray:any=[];

  public evenAgePple:any=[];
  public oddAgePple:any=[];

  public blueArray:any=[];

  constructor(private dataService:DataService) { }

  ngOnInit(): void {

    this.gettingFirst();
    this.gettingSecond();
 
  }

  public gettingFirst(){
    this.dataService.getOne().subscribe((results:any)=>{

      this.firstArray=results;
      console.log("first array",this.firstArray);
        this.ageFilter();
        this.changingToBlue();
        this.sameAppartment();

    },(err)=>{
      console.log(err);
    })
  }

    public gettingSecond(){
    this.dataService.secondApi().subscribe((data:any)=>{

      this.secondObj=data;
      console.log("second Object",this.secondObj);

      this.secondArray.push(data);
      console.log("second array",this.secondArray)


      this.moreThanFiveHundred();
      this.amsterdamAndUsa();
     this.sameCeo();
  
    

    },(err)=>{
      console.log("api array from first one",err);
    })
  }


  public ageFilter(){

    this.evenAgePple=this.firstArray.filter((person: { age: number; }) => person.age % 2 === 0)
    this.oddAgePple = this.firstArray.filter((person: { age: number; }) => person.age % 2 !== 0);
  
    let object = {
      "even": this.evenAgePple,
      "odd": this.oddAgePple
    };

    console.log("final age object: Q1",object)

  }



  public changingToBlue(){

this.blueArray = this.firstArray
                  .filter((item: { age: number; })=> item.age >= 18) 
                  .map((item1:{ age: number; }) =>{
                   return {...item1,favColor:"Blue"}
                  })
console.log("original array: for Qn:2",this.firstArray)      
console.log("blue array: Q2",this.blueArray)

  }

public sameAppartment(){

  const result = this.firstArray.reduce((groupedAppt: any,obj: any)=>{
    
    const block =obj.apartmentBlock;
    if(groupedAppt[block] == null){
      groupedAppt[block] = [];
      groupedAppt[block].push(obj);
   
    }else{
      groupedAppt[block].push(obj);
    }
      return groupedAppt;
    

  },{})

  console.log("appartment grouping :Q3",result)

}



public moreThanFiveHundred(){

  const moreThan500Employees = Object.keys(this.secondObj).filter(tenant => this.secondObj[tenant].employeeCount > 500);
  console.log("emp count more than 500:Q4",moreThan500Employees)

}


public sameCeoResults:any={};
public sameCeo(){

Object.keys(this.secondObj).forEach((teanant:any)=>{
  const ten= this.secondObj[teanant];
  if(!this.sameCeoResults[ten.CEO]){
    this.sameCeoResults[ten.CEO]=[]
  }
  this.sameCeoResults[ten.CEO].push({teanant,name:ten.name})

})

for( const key in this.sameCeoResults){
  if(this.sameCeoResults[key].length ===1){
    delete this.sameCeoResults[key];
  }
}
console.log("same ceo results: Q5",this.sameCeoResults);

}



public amsterdamAndUsa(){
const randumArray:any=[];
    Object.keys(this.secondObj).filter(tenant =>{
      if(this.secondObj[tenant].location.includes('Amsterdam') &&   this.secondObj[tenant].location.includes('USA')){
        randumArray.push(this.secondObj[tenant]);
      }
     })
     
     console.log('inial object :Q6',this.secondObj)
     console.log("USA and Amsterdam: Q6", randumArray)

}



}


















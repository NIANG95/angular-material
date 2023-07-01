import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  title = 'material-demo';
  notifications = 0;

  showSpinner= false;

  selectedValue:String | any;


  objectOptions = [
    { name : 'Angular'},
    { name : 'Angular Material'},
    { name : 'React'},
    { name : 'Vue'},
  ];

  myControl = new FormControl();
  filteredOperations: Observable<string[]> | undefined;

  options : string[] = ['Angular', 'React', 'Vue'];

  constructor(private snackbar:MatSnackBar, public dialog:MatDialog) {}

  ngOnInit(): void {
    this.filteredOperations = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value=>this._filter(value))
    )
  }

  openSnackBar(message:string, action:any) {
    let snackBarRef = this.snackbar.open(message, action, {duration: 5000});

    snackBarRef.afterDismissed().subscribe(() => {
      console.log('the snackbar was dismissed');
    })

    snackBarRef.onAction().subscribe(() => {
      console.log('The snackbar action was trigged! ')
    })
  }

  private _filter(value:string):string[] {
    const filterValue = value.toLocaleLowerCase();
    return this.options.filter(option => option.toLocaleLowerCase().includes(filterValue));
  }


  openDialog() {
    this.dialog.open(DialogExampleComponent);
  }



  displayFn(subject:any) {
    return subject ? subject.name : undefined;
  }

  loadData() {
    this.showSpinner = true;
    setTimeout(()=>{
      this.showSpinner = false;
    }, 5000);
  }
}

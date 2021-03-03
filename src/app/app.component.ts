import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';


// DATA TABLE
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
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // VIRTUAL SCROLLING
  numbers =[];


  // DATA TABLE
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(value: string){
    this.dataSource.filter = value.trim().toLowerCase();
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    // DATA TABLE
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // 3) BADGE
  notifications = 0;

  // 4) SPINNER
  showSpinner = false;

  loadData(){
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 5000)
  }

  // 6) SIDENAV
  opened = false;
  log(state){
    console.log(state);
  }

  // TABS
  logChange(index){
    console.log(index);
  }

  // SELECT
  selectedValue: string;
  selectedValue2: string;

  // AUTOCOMPLETE
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase()
    return this.options.filter(option => option.toLowerCase().includes(filterValue))
  }

  ngOnInit(){
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

  }
  
  options: string[] = ['Angular', 'React', 'Vue'];
  objectOptions = [
    { name: 'Angular'},
    { name: 'Angular Material'},
    { name: 'React'},
    { name: 'Vue'}
  ];

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  displayFn(subject){
    return subject ? subject.name : undefined;
  }

  // DATE PICKER
  minDate = new Date();
  maxDate = new Date(2021, 3, 10);

  dateFilter = date => {
    const day = date.getDay();
    return day != 0 && day != 6;
  }

  // SNACK-BAR + DIALOG
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    for (let i = 0; i < 1000; i++) {
      this.numbers.push(i);
      
    }
  }

  // DIALOG
  openDialog() {
    this.dialog.open(DialogExampleComponent);
  }

  openDialog2() {
    let dialogRef = this.dialog.open(DialogExampleComponent, {data: {name: 'Vishwas'}});

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ' + result);
    })
  }

  // SNACKBAR
  openSnackBar(message, action){
    this.snackBar.open(message, action);
  }

  openSnackBar2(message, action){
    let snackBarRef = this.snackBar.open(message, action, {duration: 2000});

    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snackbar was dismissed');
    })
    snackBarRef.onAction().subscribe(() => {
      console.log('The snackbar action was triggered!');
    })
  }





}



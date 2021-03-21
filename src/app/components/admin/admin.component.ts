import { Component, OnInit } from '@angular/core';
import { BikeService } from '../../services/bike.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public bikes: any;




  constructor(private bikeService: BikeService) { }

  ngOnInit(): void {
    this.getBikes();
  }

  getBikes(): void{
    this.bikeService.getBikes().subscribe(
      (      data: any) => { this.bikes = data; },
      (      err: any) => console.error(err),
      () => console.log('bikes load')
    );
  }

}

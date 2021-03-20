import { Component, OnInit } from '@angular/core';
import { BikeService } from '../../services/bike.service'
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public bikes: any;

  _baseUrlBe = environment.baseUrlBe;
  _baseUrlFe = environment.baseUrlFe;  


  constructor(private bikeService: BikeService) { }

  ngOnInit(): void {
    this.getBikes();
  }

  getBikes(){
    console.log('baseUrlBe' + this._baseUrlBe);
    console.log('baseUrlFe' + this._baseUrlFe);        
    this.bikeService.getBikes().subscribe(
      data => { this.bikes = data },
      err => console.error(err),
      ()=> console.log('bikes load')
    );
  }

}

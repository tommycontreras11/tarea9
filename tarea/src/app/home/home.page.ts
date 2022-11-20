import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Marker } from '../models/marker.model';
import { MapControllerService } from '../services/map-controller.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  title = "";
  lat = "";
  lng = "";

  constructor(private router: Router, private map: MapControllerService) {}

  async sendMarker(){
    if(this.title != "" && this.lat != "" && this.lng != ""){
      var marker: Marker = {
        position: {
          lat: parseFloat(this.lat),
          lng: parseFloat(this.lng),
        },
        title: this.title
      }
      this.map.addMarker(marker);
      this.router.navigate(['./map']);
    }
  }

}

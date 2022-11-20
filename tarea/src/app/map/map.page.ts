import { Component, OnInit } from '@angular/core';
import { CoordInfo } from '../models/coord-info.model';
import { Marker } from '../models/marker.model';
import { MapControllerService } from '../services/map-controller.service';

declare var google:any;
let coordInfo: CoordInfo;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})

export class MapPage implements OnInit {

  map = null;

  marker: Marker = {
    position: {
      lat: 4.658383846282959,
      lng: -74.09394073486328,
    },
    title: 'Parque Simón Bolivar'
  }

  constructor(private mapC: MapControllerService){}

  ngOnInit() {
    this.marker = this.mapC.getMarker()!;
    this.loadMap();
  }

  loadMap() {
    // create a new map by passing HTMLElement
    const input = document.getElementById('map');
    const mapEle: HTMLElement = input!;
    // create LatLng object
    const myLatLng = {lat: this.marker.position.lat, lng: this.marker.position.lng};
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.addMarker(this.marker);
      mapEle.classList.add('show-map');
    });
  }

  addMarker(marker: Marker){
    var mapMarker =  new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });
    this.addInfoToMarker(marker, mapMarker);
    return mapMarker;
  }

  addInfoToMarker(marker: Marker, mapMarker: any){
    this.mapC.getHttpData(marker).subscribe((coord:any) => {
      coordInfo = {
        country: coord.items[0].address.countryName,
        city: coord.items[0].address.city,
        marker: marker
      };

      let infoWindowContent = `<div id="content" style="color: black">
                              <h2 id="firstHeading" class="firstHeading">${marker.title}</h2>
                              <p>País ${coordInfo.country}</p>
                              <p>Ciudad ${coordInfo.city}</p>
                              </div>`;
      let infoWindow = new google.maps.InfoWindow({content: infoWindowContent});

      mapMarker.addListener('click', () => {
        infoWindow.open(this.map, mapMarker);
      })

    })
  }
}

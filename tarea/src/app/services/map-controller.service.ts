import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Marker } from '../models/marker.model';

const apiKey = "oaRtDfsxo4ykxxcXB-zZv7ApdN1PuQ78X8yeXuCfV8Mc";

@Injectable({
  providedIn: 'root'
})
export class MapControllerService {

  marker: Marker | undefined;

  constructor(private http: HttpClient) { }

  getMarker(){
    return this.marker;
  }

  addMarker(marker: Marker){
    this.marker = marker;
  }

  resetMarker(){
    this.marker = undefined;
  }

  getHttpData(marker: Marker){
    var link = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${marker.position.lat},${marker.position.lng}&lang=es-Do&apikey=${apiKey}`;
    return this.http.get(link);
  }

}

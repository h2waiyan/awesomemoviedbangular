import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  movieid!: number;
  casts: any = [];

  ngOnInit() {
    this.movieid = this.activatedRoute.snapshot.params['movieid'];
    this.getCast();
  }

  getCast() {
    var response = this.http.get(`http://api.themoviedb.org/3/movie/${this.movieid}/credits?api_key=050c28541f900007285c3020069bfd62`)
    response.subscribe({
      next: (data: any) => {
        console.log(data['cast'][0]['name']);
        this.casts = data['cast'];
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    })
  }

  //
}

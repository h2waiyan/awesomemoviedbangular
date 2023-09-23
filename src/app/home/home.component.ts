
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private http: HttpClient, private router: Router) { }

  nowplayinglist: any = [];
  popularlist: any = [];
  upcominglist: any = [];
  topratedlist: any = [];

  getMovies(category: string) {
    var response = this.http.get(`https://api.themoviedb.org/3/movie/${category}?api_key=050c28541f900007285c3020069bfd62&language=en-US&page=1`)
    return new Promise((resolve, reject) => {
      response.subscribe({
        next: (data: any) => {
          resolve(data['results']);
        },
        error: (error: any) => {
          reject(error);
        }
      })
    })

  }

  async ngOnInit() {
    this.popularlist = await this.getMovies('popular');
    this.upcominglist = await this.getMovies('upcoming');
    this.nowplayinglist = await this.getMovies('now_playing');
    this.topratedlist = await this.getMovies('top_rated');
  }

  goToDetails(movieId: number) {
    this.router.navigateByUrl(`details/${movieId}`);
  }
}

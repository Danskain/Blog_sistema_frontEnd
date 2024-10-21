import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../interfaces/post';
import { PostResponse } from '../interfaces/postResponse';
import { PostGetCategoryResponse } from '../interfaces/PostGetCategoryResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/post'
  }

  getPostsByCategory(categoryId: Number): Observable<PostGetCategoryResponse> {
    return this.http.get<PostGetCategoryResponse>(`${this.myAppUrl}api/posts/${categoryId}`);
  }

  createPost(post: Post): Observable<PostResponse> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`)
    return this.http.post<PostResponse>(`${this.myAppUrl}${this.myApiUrl}`, post, { headers: headers } )
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { Data } from 'src/app/interfaces/PostGetCategoryResponse';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  listPosts: Data[] = []
  title: string = '';
  content: string = '';
  categoryId: number = 0;
  loading: boolean = false;
  showForm: boolean = false;  // Controla la visibilidad del formulario
  showSelect: boolean = true; 
  selectedCategory: number = 0;

  constructor(
    private _productService: ProductService,
    private _errorService: ErrorService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  // Modifica el método que se activa al hacer clic en el botón "Nuevo Post"
  toggleForm() {
    this.showForm = !this.showForm; // Alternar visibilidad del formulario
    this.showSelect = !this.showSelect 
    if (this.showForm) {
      this.listPosts = [];          // Vaciar el array de posts
      this.selectedCategory = 0;    // Reiniciar la categoría seleccionada
    }
  }

  getPostsByCategory() {

    this._productService.getPostsByCategory(this.selectedCategory).subscribe({
      next: (data) => {
        //console.log("~ datas:", data)
        this.listPosts = data.data;
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
      }
    });
  }


  createPost() {
    // Creamos el objeto
    const post: Post = {
      title: this.title,
      content: this.content,
      categoryId: this.categoryId
    }
    this.loading = true;
    this._productService.createPost(post).subscribe({
      next: (v) => {
        this.loading = false;
        this.showForm = false;
        this.showSelect = true; 
        this.toastr.success(`El post ${this.title} creado con exito`, 'Post registrado');
        
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msjError(e);
      }
    })
  }

}

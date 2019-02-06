import {Injectable} from '@angular/core';
import {HttpClient,  HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Product} from './product.model';
import {Cart} from './cart.model';
import {Credentials} from './jwt.model';
import {Order} from './order.model';
import 'rxjs/add/operator/map';

const PROTOCOL = 'http';
const PORT = 3500;

@Injectable()
export class RestDataSource {
  baseUrl: string;
  products: string;
  orders: string;
  auth_token: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    // this.products = 'products';
    // this.orders = 'orders';
  }

  authenticate(user: string, pass: string): Observable<boolean> {
    return this.http.post<Credentials>(this.baseUrl + 'login', {name: user, password: pass})
      .map(response => {
        const r = response;
        this.auth_token = r.success ? r.token : null;
        console.log('r.success = ' + r.success);
        console.log('r.token = ' + r.token);
        console.log('this.auth_token: ' + this.auth_token);
        return r.success;
      });
  }

  getProducts(): Observable<any> {// Observable<Product[]>
     return this.sendRequest('get', 'products');
  }

  saveProduct(product: Product): Observable<any> { // Observable<Product>
    return this.sendRequest('post', 'products', product, true);
  }

  updateProduct(product: Product): Observable<any> { // Observable<Product>
    return this.sendRequest('put', `products/${product.id}`, product, true);
  }

  deleteProduct(id: number): Observable<any> { // Observable<Product>
    return this.sendRequest('delete', `products/${id}`, null, true);
  }

  getOrders(): Observable<any> { // Observable<Order[]>
    return this.sendRequest('get', 'orders', null, true);
  }

  deleteOrder(id: number): Observable<any> { // Observable<Order[]>
    return this.sendRequest('delete', `orders/${id}`, null, true);
  }

  updateOrder(order: Order): Observable<any> {
    return this.sendRequest('put', `orders/${order.id}`, order, true);
  }
  saveOrder(order: Order): Observable<any> {
    return this.sendRequest('post', 'orders', order);
  }

  private sendRequest(method: string, url: string, body?: Product | Order, auth: boolean = false)
                  : Observable<Product | Product[] | Order | Order[]> {
    let headers = new HttpHeaders();
    const resUrl = this.baseUrl + url;
    console.log('auth = ' + auth);
    console.log('this.auth_token = ' + this.auth_token);
    console.log('method: ' + method);
    if (auth && this.auth_token !== null) {
        headers = headers.set('Authorization', `Bearer<${this.auth_token}>`);
    }

    return this.http.request(method, resUrl, {body: body, headers: headers});
      // .map(response => response.json());
  }
}


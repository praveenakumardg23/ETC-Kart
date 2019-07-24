import { Directive, HostListener, Input, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { OnInit } from "@angular/core";
declare let dataLayer: any;

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[appEventTracker]'
})
export class GoogleAnalyticsDirective implements OnInit{
  @Input() public event: string[] = [];
  @Input() public roleType: string;
  @Input() public navName: string;
  @Input() public navURL: string;
  @Input() public signInStatus: string;

  public model: any;
  public userId = sessionStorage.getItem("USERID");
  private currentUrl: string;

  /**
   * Initializing variable of type Router,ElementRef and ConfigService in order to access it's contents
   * @param logger LoggerService
   * @param router - Router
   * @param elementRef - ElementRef
   * @param configService - ConfigService
   */
  constructor(private router?: Router, private elementRef?: ElementRef) {
    this.currentUrl = this.router.url;
  }
ngOnInit(){  
}
  /**
  * Function to capture the google event on click event
  */
  @HostListener("click")
  public onClick(): any {
    this.event.forEach((e: string) => {
      this.model = {
        event: e,
        page: this.currentUrl,
        userId: this.userId,
        roleType: "Role"
      };
      switch (e) {
         case 'loginEvent':
         this.model = {
          event: e,
          page: this.currentUrl,
          userId: this.userId,
          roleType: "Role"
        };
        this.model['signInStatus']= this.signInStatus;
           dataLayer.push(this.model);
          break;
          case 'MainNav':
          this.model = {
           event: e,
           page: this.currentUrl,
           userId: this.userId,
           roleType: "Role"
         };
         this.model['signInStatus']= this.signInStatus;
            dataLayer.push(this.model);
          break;
        default:
      }
    });
  }
}

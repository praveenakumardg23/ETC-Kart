import { Directive, HostListener, Input, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { OnInit } from "@angular/core";
//import { log } from "util";
// import {
//   DROPDOWN_CLICK_GOOGLE_EVENT,
//   BREADCRUM_CLICK_GOOGLE_EVENT,
//   LIGHT_BOX_CLICK_GOOGLE_EVENT,
//   NAVIGATION_CLICK_GOOGLE_EVENT,
//   SIGNINOUT_GOOGLE_EVENT,
//   CHECKBOX_GOOGLE_EVENT,
//   JUMP_TAB_GOOGLE_EVENT,
//   FILTER_CLICK_GOOGLE_EVENT,
//   RADIO_CLICK_GOOGLE_EVENT,
//   FORM_SUBMISSION_GOOGLE_EVENT,
//   ACCORDIAN_GOOGLE_EVENT,
//   DOLLAR,
//   CALLOUT_ENGAGEMENT_GOOGLE_EVENT,
//   LINK_OR_BUTTON_CLICK,
//   SEARCH_SUBMIT_GOOGLE_EVENT,
//   analyticInput
// } from '../utils/app.jsonkeys';
// import { Router, NavigationEnd } from '@angular/router';
// import { environment } from '../../../../environments/environment';
// import { DirectiveModelClass } from '@app/common/models/google.directive.model';
// import { ConfigService } from '@app/common/services/generic/config.service';
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
    console.log(this.currentUrl)
  }
ngOnInit(){
  console.log(this.currentUrl)
  
}
  /**
  * Function to capture the google event on click event
  */
  @HostListener("click")
  public onClick(): any {
    console.log('event clicked')
    this.event.forEach((e: string) => {
      this.model = {
        event: e,
        page: this.currentUrl,
        userId: this.userId,
        roleType: "Role"
      };
      console.log(this.model)
      switch (e) {
         case 'signIn':
         this.model = {
          event: e,
          page: this.currentUrl,
          userId: this.userId,
          roleType: "Role"
        };
        this.model['signInStatus']= this.signInStatus;
           dataLayer.push(this.model);
           console.log(this.model)
          break;
         case 'LIGHT_BOX_CLICK_GOOGLE_EVENT':
        //   this.model[analyticInput.lightboxName] = this.lightboxName;
        //   this.model[analyticInput.lightboxClickName] = this.lightboxClickName;
          dataLayer.push(this.model);
          break;
        case 'RADIO_CLICK_GOOGLE_EVENT':
          // this.model[analyticInput.radioButtonMenu] = this.radioButtonMenu;
          // this.model[analyticInput.radioButtonName] = this.radioButtonName;
          dataLayer.push(this.model);
          break;
        case 'BREADCRUM_CLICK_GOOGLE_EVENT':
          // this.model[analyticInput.breadcrumbCategory] = this.breadcrumbCategory;
          // this.model[analyticInput.breadcrumbName] = this.breadcrumbName;
          dataLayer.push(this.model);
          break;
        case  'FILTER_CLICK_GOOGLE_EVENT':
          // this.model[analyticInput.filterClickType] = this.filterClickType;
          // this.model[analyticInput.filterClickName] = this.filterClickName;
          dataLayer.push(this.model);
          break;
        case 'NAVIGATION_CLICK_GOOGLE_EVENT':
          // this.model[analyticInput.navType] = this.navType;
          // this.model[analyticInput.navName] = this.navName;
          //this.model[analyticInput.navURL] = this.navURL;
          dataLayer.push(this.model);
          break;
        case 'SIGNINOUT_GOOGLE_EVENT':
          // this.model[analyticInput.signInStatus] = this.signInStatus;
          // this.model[analyticInput.roleType] = this.roleType;
          // this.model[analyticInput.userId] = this.userSysNumber;
          dataLayer.push(this.model);
          break;
       
        default:
      }
    });
  }
}

import { Component, OnInit } from "@angular/core";

import { Error } from "./error";
import { ErrorService } from "./error.service";
@Component({
    selector: 'my-error',
    template: `
        <div class="backdrop" [ngStyle]="{'display': errorDisplay}"></div>
        <div class="modal" tabindex="-1" role="dialog" [ngStyle]="{'display': errorDisplay}">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-label="Close" (click)="onErrorHandled()"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">{{errorData?.title}}</h4>
                    </div>
                    <div class="modal-body">
                     <p>{{errorData?.message}}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" (click)="onErrorHandled()">Close</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->  
    `,
    styles: [`
        .backdrop {
            background-color: rgba(0,0,0,0.6);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
        }
    `]
})
export class ErrorComponent implements OnInit {
    errorDisplay = 'none';
    errorData: Error;

    constructor (private _errorService: ErrorService) {}

    onErrorHandled() {
        this.errorDisplay = 'none';
    }

    ngOnInit() {
        this._errorService.errorOccurred.subscribe(
          errorData => {
              this.errorData = errorData;
              this.errorDisplay = 'block';
          }
        );
    }
}
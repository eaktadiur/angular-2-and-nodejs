import { Component, OnInit } from "@angular/core";

import { Message } from "./message";
import { MessageService } from "./message.service";
import { ErrorService } from "../errors/error.service";
@Component({
  selector: 'my-message-input',
  templateUrl: 'app/messages/views/input.html'
})
export class MessageInputComponent implements OnInit {
  message: Message = null;

  constructor(private _messageService: MessageService, private _errorService: ErrorService) {}

  onSubmit(form:any) {
    if (this.message) {
            // Edit
            this.message.content = form.content;
            this._messageService.updateMessage(this.message)
            .subscribe(
              data => console.log(data),
              error => this._errorService.handleError(error)
              );
            this.message = null;
          } else {
            const message:Message = new Message(form.content, null, 'Dummy');
            this._messageService.addMessage(message)
            .subscribe(
              data => {
                console.log(data);
                this._messageService.messages.push(data);
              },
              error => this._errorService.handleError(error)
              );
          }

        }

        onCancel() {
          this.message = null;
        }

        ngOnInit() {
          this._messageService.messageIsEdit.subscribe(
            message => {
              this.message = message;
            }
            );
        }
      }
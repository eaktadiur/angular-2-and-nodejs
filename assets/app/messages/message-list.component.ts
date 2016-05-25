import { Component, OnInit } from "@angular/core";

import { MessageComponent } from "./message.component";
import { Message } from "./message";
import { MessageService } from "./message.service";
import { ErrorService } from "../errors/error.service";
@Component({
  moduleId: module.id,
  selector: 'my-message-list',
  templateUrl: './views/list.html',
  directives: [MessageComponent]
})
export class MessageListComponent implements OnInit {

  constructor(private _messageService: MessageService, private _errorService: ErrorService) {}

  messages: Message[];

  ngOnInit() {
    this._messageService.getMessages()
    .subscribe(
      messages => {
        this.messages = messages;
        this._messageService.messages = messages;
      },
      error => this._errorService.handleError(error)
      );
  }
}
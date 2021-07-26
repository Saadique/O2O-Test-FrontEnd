import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PeopleServiceService } from './services/people-service.service';
import { ConversationServiceService } from './services/conversation-service.service';
import { MessageServiceService } from './services/message-service.service';
import { AuthService } from './services/auth.service';
import { LocalStorageServiceService } from './services/local-storage-service.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [PeopleServiceService, ConversationServiceService, MessageServiceService, AuthService, LocalStorageServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

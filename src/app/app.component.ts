import { Component, Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LocalStorageServiceService } from './services/local-storage-service.service';
import { ConversationServiceService } from './services/conversation-service.service';
import { PeopleServiceService } from './services/people-service.service';
import { MessageServiceService } from './services/message-service.service';
import { Observable, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Alert {
  status: any;
  message: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageServiceService,
    private conversationService: ConversationServiceService,
    private peopleService: PeopleServiceService,
    private messageService: MessageServiceService) { }


  alert = new Alert();
  ngOnInit() {
    this.checkLoggedIn();
    console.log(this.localStorageService.getData());
    this.loggedInUserId = this.localStorageService.getData().person_id;
    this.getConversationsOfOwner();
    this.getConversationsOfMember();
    this.getAllPeople();
  }

  showCreateConversation: boolean = false;
  showMembersScreen: boolean = false;

  isLoggedIn: boolean = false;
  showPeople: boolean = false;
  isInit: boolean = false;

  email: string = "";
  password: string = "";
  conTitle: string = "";
  membersOfACon;
  selectedCon;
  conversationsOfMember;
  conversationsOfOwner;
  people;
  loggedInUserId;
  isTitleEmpty: boolean = false;
  messages;
  messageText: string = "";


  checkLoggedIn() {
    if (window.localStorage.getItem('o2o-token')) {
      this.isLoggedIn = true;
    }
  }

  login() {
    if (this.email != "" && this.password != "") {
      let data = {
        email: this.email,
        password: this.password
      }
      this.authService.login(data).subscribe({
        next: (response: any) => {
          console.log(response);
          this.isLoggedIn = true;
          this.localStorageService.setData(response);
          this.localStorageService.setToken(response.token);
          this.ngOnInit();
        },
        error: (err: any) => {
          console.log(err.error.message);
        }
      })
    } else {
      console.log("please enter");
    }
  }




  showCreateConForm() {
    this.showCreateConversation = true;
    this.showMembersScreen = false;
    this.showPeople = true;
  }

  hideConForm() {
    this.showCreateConversation = false;
    this.showPeople = false;
  }

  logout() {
    this.localStorageService.clearLogin();
  }

  nextAddPeople() {
    if (this.conTitle != "") {
      this.isTitleEmpty = false;
      let data = {
        "title": this.conTitle,
        "owner_id": this.localStorageService.getData().person_id
      }

      this.conversationService.createConversation(data).subscribe({
        next: (response: any) => {
          this.showMembersScreen = true;
          this.showCreateConversation = false;
          this.conTitle = "";
          console.log(response);
          this.selectedCon = response;
          this.getMembersOfCon();
          this.getConversationsOfOwner();
        },
        error: (err: any) => {
          console.log(err.error.message);
        }
      })
    } else {
      this.isTitleEmpty = true;
    }
  }

  getMembersOfCon() {
    console.log(this.selectedCon);
    this.conversationService.getMembersOfConversation(this.selectedCon.id).subscribe({
      next: (response: any) => {
        this.membersOfACon = response;
        console.log(response);
      },
      error: (err: any) => {
        console.log(err.error.message);
      }
    })
  }

  getConversationsOfOwner() {
    this.conversationService.getConversationByOwner(this.localStorageService.getData().person_id).subscribe({
      next: (response: any) => {
        this.conversationsOfOwner = response;
        console.log(response);
      },
      error: (err: any) => {
        console.log(err.error.message);
      }
    })
  }

  getAllPeople() {
    this.peopleService.getAllPeople().subscribe({
      next: (response: any) => {
        this.people = response;
        console.log(response);
      },
      error: (err: any) => {
        console.log(err.error.message);
      }
    })
  }

  getConversationsOfMember() {
    this.conversationService.getConversationByPerson(this.localStorageService.getData().person_id).subscribe({
      next: (response: any) => {
        this.conversationsOfMember = response;
        console.log(response);
      },
      error: (err: any) => {
        console.log(err.error.message);
      }
    })
  }

  membersClick(conversation) {
    this.showMembersScreen = true;
    this.showPeople = true;
    this.showCreateConversation = false;
    this.selectedCon = conversation;
    this.getMembersOfCon();
    console.log("click");
  }

  messagesClick(conversation) {
    this.isInit = true;
    this.showMembersScreen = false;
    this.showPeople = false;
    this.showCreateConversation = false;
    this.selectedCon = conversation;
    this.getMessagesByConversation();

    const ticker = timer(0, 5000);
    // ticker.subscribe(() => {
    //   this.getMessagesByConversation();
    //   console.log("got");
    // });


  }

  getMessagesByConversation() {
    this.messageService.getMessagesByConversation(this.selectedCon.id).subscribe({
      next: (response: any) => {
        console.log(response);
        this.messages = response;
      },
      error: (err: any) => {
        console.log(err.error.message);
      }
    })
  }

  addPerson(person_id) {
    this.conversationService.addPerson(this.selectedCon.id, person_id).subscribe({
      next: (response: any) => {
        console.log(response);
        this.getMembersOfCon();
        this.getConversationsOfMember();
        this.getConversationsOfOwner();
      },
      error: (err: any) => {
        console.log(err.error.message);
      }
    })
  }

  removePerson(person_id) {
    this.conversationService.removePerson(this.selectedCon.id, person_id).subscribe({
      next: (response: any) => {
        console.log(response);
        this.getMembersOfCon();
        this.getConversationsOfMember();
        this.getConversationsOfOwner();
      },
      error: (err: any) => {
        console.log(err.error.message);
      }
    })
  }

  cancelConForm() {
    this.showCreateConversation = false;
    this.showMembersScreen = false;
    this.showPeople = false;
  }

  createMessage() {
    if (this.messageText != "") {
      let data = {
        "person_id": this.localStorageService.getData().person_id,
        "conversation_id": this.selectedCon.id,
        "body": this.messageText
      }
      this.messageService.createMessage(data).subscribe({
        next: (response: any) => {
          this.messageText = "";
          this.getMessagesByConversation();
        },
        error: (err: any) => {
          console.log(err.error.message);
        }
      })
    }
  }

  deleteCon() {
    this.conversationService.deleteConversation(this.selectedCon.id).subscribe({
      next: (response: any) => {
        console.log(response);
        this.showCreateConversation = false;
        this.showMembersScreen = false;
        this.showPeople = false;
        this.isInit = false;
        this.getMembersOfCon();
        this.getConversationsOfMember();
        this.getConversationsOfOwner();
      },
      error: (err: any) => {
        console.log(err.error.message);
      }
    })
  }

  deleteMessage(message) {
    this.messageService.deleteMessages(message.id).subscribe({
      next: (response: any) => {
        this.messageText = "";
        this.getMessagesByConversation();
      },
      error: (err: any) => {
        console.log(err.error.message);
      }
    })
  }

  decideClass() {
    if (this.showCreateConversation && this.showPeople) {
      return 'mesgs_with_people';
    }
    return 'mesgs_without_people';
  }

  highlightSelected(conversation_id) {
    if (conversation_id == this.selectedCon.id) {
      return 'chat_list_selected';
    }
    return 'chat_list';
  }



  // title = 'angular-chat';
  // channel: ChannelData;
  // username = '';
  // messages: Message[] = [];
  // newMessage = '';
  // channelList: ChannelData[];
  // chatClient: any;
  // currentUser: User;

  // async joinChat() {
  //   const { username } = this;
  //   try {
  //     const response = await axios.post('http://localhost:5500/join', {
  //       username,
  //     });
  //     const { token } = response.data;
  //     const apiKey = response.data.api_key;

  //     this.chatClient = new StreamChat(apiKey);

  //     this.currentUser = await this.chatClient.setUser(
  //       {
  //         id: username,
  //         name: username,
  //       },
  //       token
  //     );

  //     const channel = this.chatClient.channel('team', 'talkshop');
  //     await channel.watch();
  //     this.channel = channel;
  //     this.messages = channel.state.messages;
  //     this.channel.on('message.new', event => {
  //       this.messages = [...this.messages, event.message];
  //     });

  //     const filter = {
  //       type: 'team',
  //       members: { $in: [`${this.currentUser.me.id}`] },
  //     };
  //     const sort = { last_message_at: -1 };

  //     this.channelList = await this.chatClient.queryChannels(filter, sort, {
  //       watch: true,
  //       state: true,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     return;
  //   }
  // }

  // async sendMessage() {
  //   if (this.newMessage.trim() === '') {
  //     return;
  //   }

  //   try {
  //     await this.channel.sendMessage({
  //       text: this.newMessage,
  //     });
  //     this.newMessage = '';
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
}

import { TestBed } from '@angular/core/testing';

import { ConversationServiceService } from './conversation-service.service';

describe('ConversationServiceService', () => {
  let service: ConversationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

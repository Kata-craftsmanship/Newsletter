import { assert, describe, expect, it, vi } from "vitest";

import {
  dateServiceStub,
  messagePublisherStub,
  messageRepositoryStub,
  stubMessage,
  stubMessageParams,
} from "./stub";
import { createMessageService } from "../../src/domain/message/port/userside/messageService";

describe("Message Service", () => {
  it("doit créer un message", () => {
    //Given
    const params = stubMessageParams;

    //When
    const spy = vi.spyOn(console, "log");
    const msgService = createMessageService({
      dateService: dateServiceStub,
      messageRepository: messageRepositoryStub,
      messagePublisher: messagePublisherStub,
    });
    const message = msgService.creer(params);

    //Then
    expect(message).toMatchObject(params);
    assert.equal(message.etat, "Brouillon");
    assert.equal(message.dateCreation, dateServiceStub.now());
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Doit valider et publier un message validé", () => {
    //Given
    const message = stubMessage;

    //When
    const spy = vi.spyOn(console, "log");
    const msgService = createMessageService({
      dateService: dateServiceStub,
      messageRepository: messageRepositoryStub,
      messagePublisher: messagePublisherStub,
    });
    const messageValidé = msgService.valider(message.id);

    //Then
    assert.equal(messageValidé.etat, "Publier");
    expect(spy).toHaveBeenCalledTimes(2);
  });
});

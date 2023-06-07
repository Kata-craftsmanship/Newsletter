import { assert, describe, expect, it, vi } from "vitest";

import {
  dateServiceStub,
  messagePublisherStub,
  messageRepositoryStub,
  stubMessage,
} from "./stub";
import { createMessageService } from "../../src/domain/message/port/userside/messageService";
import { Message } from "../../src/domain/message/application/message";

describe("Message Service", () => {
  it("doit créer un message", () => {
    //Given
    const params = {
      id: 2,
      titre: "Mon titre",
      description: "ma description",
      tag: ["tag1", "tag2"],
    };

    //When
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
    expect(messageRepositoryStub.getById(params.id)).not.toBeUndefined();
  });

  it("Doit valider et publier un message validé", () => {
    //Given
    const message = {
      id: 2,
      titre: "Mon titre",
      description: "ma description",
      etat: "Brouillon",
      tag: ["tag1", "tag2"],
      dateCreation: 12,
    };
    messageRepositoryStub.persister(message);
    const spy = vi.spyOn(console, "log");

    //When
    const msgService = createMessageService({
      dateService: dateServiceStub,
      messageRepository: messageRepositoryStub,
      messagePublisher: messagePublisherStub,
    });
    const messageValidé = msgService.valider(message.id);

    //Then
    assert.equal(messageValidé.etat, "Publier");
    expect(spy).toHaveBeenCalledWith(messageValidé.id);
  });

  it("Doit persister les modification d'un message en etat brouillon", () => {
    //Given
    const messageBrouillon: Message = {
      ...stubMessage,
      id: 12,
      etat: "Brouillon",
    };
    messageRepositoryStub.persister(messageBrouillon);

    //When
    const msgService = createMessageService({
      dateService: dateServiceStub,
      messageRepository: messageRepositoryStub,
      messagePublisher: messagePublisherStub,
    });
    const messageModifie = msgService.modifier(messageBrouillon.id, {
      titre: "TOTO",
    });

    //Then
    assert.equal(messageModifie.titre, "TOTO");
    expect(messageRepositoryStub.getById(messageBrouillon.id).titre).toEqual(
      "TOTO"
    );
  });

  it("Ne Doit pas persister les modification d'un message en etat publier", () => {
    //Given
    const messagePublie: Message = {
      ...stubMessage,
      titre: "Titre qui ne doit pas être modifié",
      id: 99,
      etat: "Publier",
    };
    messageRepositoryStub.persister(messagePublie);

    //When
    const msgService = createMessageService({
      dateService: dateServiceStub,
      messageRepository: messageRepositoryStub,
      messagePublisher: messagePublisherStub,
    });
    const messageModifie = msgService.modifier(messagePublie.id, {
      titre: "TITI",
    });

    //Then
    assert.equal(messageModifie.titre, messagePublie.titre);
    expect(messageRepositoryStub.getById(messagePublie.id).titre).toEqual(
      messagePublie.titre
    );
  });
});

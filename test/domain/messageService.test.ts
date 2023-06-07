import { assert, describe, expect, it, vi } from "vitest";


import {
  messageServiceStub,
  stubMessage,
  stubMessageParams,
} from "./stub/messageStub";

describe("Message Service", () => {
  it("doit créer un message", () => {
    //Given
    const params = stubMessageParams;

    //When
    const spy = vi.spyOn(console, "log");
    const msgService = messageServiceStub;
    const message = msgService.creer(params);

    //Then
    expect(message).toMatchObject(params);
    assert.equal(message.etat, "Brouillon");
    assert.equal(message.dateCreation, 5);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Doit publier un message validé", () => {
    //Given
    const message = stubMessage;

    //When
    const spy = vi.spyOn(console, "log");
    const msgService = messageServiceStub;
    const messageValidé = msgService.valider(message.id);

    //Then
    assert.equal(messageValidé.etat, "Publier");
    expect(spy).toHaveBeenCalledTimes(2);
  });
});

import { Message, Params } from "./message";
import { MessagePublisher } from "./messagePublisher";
import { MessageRepository } from "./messageRepository";

export type DateService = {
  now: () => number;
};

export type MessageService = {
  creer: (param: Params) => Message;
  valider: (id: number) => Message;
};

export const createMessageService = (props: {
  messageRepository: MessageRepository;
  messagePublisher: MessagePublisher;
  dateService: DateService;
}): MessageService => {
  const { dateService, messageRepository, messagePublisher } = props;

  const creer = (params: Params): Message => {
    const message: Message = {
      ...params,
      etat: "Brouillon",
      dateCreation: dateService.now(),
      id: Math.random(),
    };
    messageRepository.persister(message);
    return message;
  };

  const valider = (id: number) => {
    const message: Message = {
      ...messageRepository.getById(id),
      etat: "Publier",
    };
    messageRepository.persister(message);
    messagePublisher.publier(message);
    return message;
  };

  return { creer, valider };
};

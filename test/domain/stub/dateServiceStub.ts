import { DateService } from "../../../src/domain/message/port/serverside";

export const dateServiceStub: DateService = { now: () => 5 };

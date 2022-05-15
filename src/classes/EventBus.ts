import {EventSubscribe} from "./EventSubscribe";

export class EventBus {

  _namespace: string | null = null;

  _events: Array<EventSubscribe> = [];

  constructor(namespace: string | null = null, events: Array<EventSubscribe> = []) {
    this._namespace = namespace;
    this._events = events;
  }

  subscribe(subscribe: EventSubscribe): void {
    this._events.push(subscribe);
  }

  unsubscribe(subscribeId: string): void {
    const subscribeItemIndex: number = this._events.findIndex(handler => handler._id === subscribeId);

    subscribeItemIndex !== -1
      ? this._events.splice(subscribeItemIndex, 1)
      : null
  }

  async push(eventName: string, data: any = null) {
    for (let event of this._events) {
      if (event._eventName !== eventName) continue;

      await this._invokeHandlers(event, data);
    }
  }

  async _invokeHandlers(event: EventSubscribe, data: any) {
    try {
      const result = await event._handler(data);
      await event._resultHandler(result);
    } catch (error) {
      await event._errorHandler(error);
    }
  }

}
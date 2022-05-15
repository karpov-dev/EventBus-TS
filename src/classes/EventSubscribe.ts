import {nanoid} from "nanoid";

export class EventSubscribe {

  _id: string | null = null;

  _eventName: string | null = null;

  _handler: Function = new Function();

  _resultHandler: Function = new Function();

  _errorHandler: Function = new Function();

  constructor(eventName: string, handler: Function, resultHandler: Function = new Function(), errorHandler: Function = new Function()) {
    this._id = nanoid();
    this._eventName = eventName;
    this._handler = handler;
    this._resultHandler = resultHandler;
    this._errorHandler = errorHandler;
  }

}
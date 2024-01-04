export class ValueTooLowError extends Error {

  constructor() {
    super("Value for number chip must not be below 2");
  }

}
export class TooMuchStreetsError extends Error {

  constructor() {
    super("Too much streets already exist");
  }

}
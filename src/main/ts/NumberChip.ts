import {ValueTooLowError} from "./ValueTooLowError";
import {ValueTooHighError} from "./ValueTooHighError";

export class NumberChip {

  private readonly value: number;

  constructor(value: number) {
    if(value < 2) {
      throw new ValueTooLowError();
    }
    if(value > 12) {
      throw new ValueTooHighError();
    }
    this.value = value;
  }

  getValue() {
    return this.value;
  }
}
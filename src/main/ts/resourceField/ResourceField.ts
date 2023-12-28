import {NumberChip} from "./numberChip/NumberChip";
import {NoSettlementToUpdateError} from "./NoSettlementToUpdateError";
import {SettlementAlreadyExistsHereError} from "./SettlementAlreadyExistsHereError";
import {SettlementsTooCloseError} from "./SettlementsTooCloseError";
import {StreetAlreadyExistsHereError} from "./StreetAlreadyExistsHereError";

export class ResourceField {

  private readonly settlements: { [key: number]: number };
  private readonly streets: { [key: number]: number };
  private readonly cities: number[];
  private numberChip?: NumberChip;

  constructor() {
    this.settlements = {};
    this.streets = [];
    this.cities = [];
  }

  addSettlementToPosition(number: number) {
    if(typeof this.settlements[number] !== "undefined") {
      throw new SettlementAlreadyExistsHereError();
    }
    if(typeof this.settlements[number - 1] !== "undefined" ||
      typeof this.settlements[number + 1] !== "undefined") {
      throw new SettlementsTooCloseError();
    }
    this.settlements[number] = 0;
  }

  getSettlements(): number[] {
    return Object.values(this.settlements);
  }

  addStreetToPosition(number: number) {
    if(typeof this.streets[number] !== "undefined") {
      throw new StreetAlreadyExistsHereError();
    }
    this.streets[number] = 0;
  }

  getStreets() {
    return Object.values(this.streets);
  }

  setNumberChip(numberChip: NumberChip) {
    this.numberChip = numberChip;
  }

  getResourcesForRoll(roll: number) {
    if(this.numberChip?.getValue() === roll) {
      return Object.values(this.settlements).length + (this.cities.length * 2);
    } else {
      return 0;
    }
  }

  upgradeSettlementToCity() {
    if(Object.values(this.settlements).length === 0) {
      throw new NoSettlementToUpdateError();
    }
    delete this.settlements[1];
    this.cities.push(0);
  }

  getCities() {
    return this.cities;
  }
}
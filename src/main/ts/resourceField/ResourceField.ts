import {TooMuchSettlementsError} from "./TooMuchSettlementsError";
import {TooMuchStreetsError} from "./TooMuchStreetsError";
import {NumberChip} from "./numberChip/NumberChip";
import {NoSettlementToUpdateError} from "./NoSettlementToUpdateError";
import {SettlementAlreadyExistHereError} from "./SettlementAlreadyExistHereError";
import {SettlementsTooCloseError} from "./SettlementsTooCloseError";

export class ResourceField {

  private readonly settlements: { [key: number]: number };
  private readonly streets: number[];
  private readonly cities: number[];
  private numberChip?: NumberChip;

  constructor() {
    this.settlements = {};
    this.streets = [];
    this.cities = [];
  }

  addSettlementToPosition(number: number) {
    if(typeof this.settlements[number] !== "undefined") {
      throw new SettlementAlreadyExistHereError();
    }
    if(typeof this.settlements[number - 1] !== "undefined" ||
      typeof this.settlements[number + 1] !== "undefined") {
      throw new SettlementsTooCloseError();
    }
    if(Object.values(this.settlements).length < 3) {
      this.settlements[number] = 0;
    } else {
      throw new TooMuchSettlementsError();
    }
  }

  getSettlements(): number[] {
    return Object.values(this.settlements);
  }

  addStreet() {
    if(this.streets.length < 6) {
      this.streets.push(0);
    } else {
      throw new TooMuchStreetsError();
    }
  }

  getStreets() {
    return this.streets;
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
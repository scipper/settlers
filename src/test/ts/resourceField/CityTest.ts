import {Suite} from "../testHelpers/Suite";
import {assert} from "chai";
import {BeforeEach, Test} from "../testHelpers";
import {ResourceField} from "../../../main/ts/resourceField/ResourceField";
import {NoSettlementToUpdateError} from "../../../main/ts/resourceField/NoSettlementToUpdateError";


@Suite
export class CityTest {

  // @ts-ignore
  private resourceField: ResourceField;

  @BeforeEach
  setUp() {
    this.resourceField = new ResourceField();
  }

  @Test
  should_upgrade_1_settlement_to_a_city() {
    this.resourceField.addSettlementToPosition(1);
    this.resourceField.upgradeSettlementToCity();

    assert.equal(this.resourceField.getSettlements().length, 0);
    assert.equal(this.resourceField.getCities().length, 1);
  }

  @Test
  should_not_upgrade_to_a_city_when_no_settlement_is_available() {
    assert.throws(() => this.resourceField.upgradeSettlementToCity(), NoSettlementToUpdateError);
  }

}
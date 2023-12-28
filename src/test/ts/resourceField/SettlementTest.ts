import {Suite} from "../testHelpers/Suite";
import {assert} from "chai";
import {BeforeEach, Test} from "../testHelpers";
import {TooMuchSettlementsError} from "../../../main/ts/resourceField/TooMuchSettlementsError";
import {ResourceField} from "../../../main/ts/resourceField/ResourceField";


@Suite
export class SettlementTest {

  // @ts-ignore
  private resourceField: ResourceField;

  @BeforeEach
  setUp() {
    this.resourceField = new ResourceField();
  }

  @Test
  should_add_1_settlement_to_a_resource_field() {
    this.resourceField.addSettlement();

    assert.equal(this.resourceField.getSettlements().length, 1);
  }

  @Test
  should_add_up_to_3_settlements_to_a_resource_field() {
    this.resourceField.addSettlement();
    this.resourceField.addSettlement();
    this.resourceField.addSettlement();

    assert.equal(this.resourceField.getSettlements().length, 3);
  }

  @Test
  should_not_allow_more_then_3_settlements_on_a_resource_field() {
    this.resourceField.addSettlement();
    this.resourceField.addSettlement();
    this.resourceField.addSettlement();

    assert.throws(() => this.resourceField.addSettlement(), TooMuchSettlementsError);
  }

}
import {Suite} from "./testHelpers/Suite";
import {assert} from "chai";
import {BeforeEach, Test} from "./testHelpers";
import {TooMuchSettlementsError} from "../../main/ts/TooMuchSettlementsError";
import {ResourceField} from "../../main/ts/ResourceField";
import {TooMuchStreetsError} from "../../main/ts/TooMuchStreetsError";
import {NumberChip} from "../../main/ts/NumberChip";
import {NoSettlementToUpdateError} from "../../main/ts/NoSettlementToUpdateError";


@Suite
export class ResourceFieldTest {

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

  @Test
  should_upgrade_1_settlement_to_a_city() {
    this.resourceField.addSettlement();
    this.resourceField.upgradeSettlementToCity();

    assert.equal(this.resourceField.getSettlements().length, 0);
    assert.equal(this.resourceField.getCities().length, 1);
  }

  @Test
  should_not_upgrade_to_a_city_when_no_settlement_is_available() {
    assert.throws(() => this.resourceField.upgradeSettlementToCity(), NoSettlementToUpdateError)
  }

  @Test
  should_add_1_street_to_a_resource_field() {
    this.resourceField.addStreet();

    assert.equal(this.resourceField.getStreets().length, 1);
  }

  @Test
  should_add_up_to_6_streets_to_a_resource_field() {
    this.resourceField.addStreet();
    this.resourceField.addStreet();
    this.resourceField.addStreet();
    this.resourceField.addStreet();
    this.resourceField.addStreet();
    this.resourceField.addStreet();

    assert.equal(this.resourceField.getStreets().length, 6);
  }

  @Test
  should_not_allow_more_then_6_streets_on_a_resource_field() {
    this.resourceField.addStreet();
    this.resourceField.addStreet();
    this.resourceField.addStreet();
    this.resourceField.addStreet();
    this.resourceField.addStreet();
    this.resourceField.addStreet();

    assert.throws(() => this.resourceField.addStreet(), TooMuchStreetsError);
  }

  @Test
  should_not_produce_resource_when_no_settlements_where_build_to_resource() {
    this.resourceField.setNumberChip(new NumberChip(2));

    const resource = this.resourceField.getResourcesForRoll(2);

    assert.equal(resource, 0);
  }

  @Test
  should_produce_resource_when_number_chip_value_gets_rolled() {
    this.resourceField.setNumberChip(new NumberChip(2));
    this.resourceField.addSettlement();

    const resource = this.resourceField.getResourcesForRoll(2);

    assert.equal(resource, 1);
  }

  @Test
  should_produce_resource_for_every_settlement() {
    this.resourceField.setNumberChip(new NumberChip(2));
    this.resourceField.addSettlement();
    this.resourceField.addSettlement();
    this.resourceField.addSettlement();

    const resource = this.resourceField.getResourcesForRoll(2);

    assert.equal(resource, 3);
  }

  @Test
  should_produce_2_resources_for_city() {
    this.resourceField.setNumberChip(new NumberChip(2));
    this.resourceField.addSettlement();
    this.resourceField.upgradeSettlementToCity();

    const resource = this.resourceField.getResourcesForRoll(2);

    assert.equal(resource, 2);
  }

  @Test
  should_not_produce_resource_when_wrong_number_gets_rolled() {
    this.resourceField.setNumberChip(new NumberChip(2));
    this.resourceField.addSettlement();

    const resource = this.resourceField.getResourcesForRoll(3);

    assert.equal(resource, 0);
  }

}
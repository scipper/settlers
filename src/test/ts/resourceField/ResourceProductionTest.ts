import {Suite} from "../testHelpers/Suite";
import {assert} from "chai";
import {BeforeEach, Test} from "../testHelpers";
import {ResourceField} from "../../../main/ts/resourceField/ResourceField";
import {NumberChip} from "../../../main/ts/resourceField/numberChip/NumberChip";


@Suite
export class ResourceProductionTest {

  // @ts-ignore
  private resourceField: ResourceField;

  @BeforeEach
  setUp() {
    this.resourceField = new ResourceField();
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
import {Suite} from "./testHelpers/Suite";
import {Test} from "./testHelpers";
import {assert} from "chai";
import {ValueTooLowError} from "../../main/ts/ValueTooLowError";
import {ValueTooHighError} from "../../main/ts/ValueTooHighError";
import {NumberChip} from "../../main/ts/NumberChip";

@Suite
export class NumberChipTest {

  @Test
  should_allow_2_as_lowest_value() {
    const numberChip = new NumberChip(2);

    assert.equal(numberChip.getValue(), 2);
  }

  @Test
  should_allow_12_as_highest_value() {
    const numberChip = new NumberChip(12);

    assert.equal(numberChip.getValue(), 12);
  }

  @Test
  should_not_allow_values_below_2() {
    assert.throws(() => new NumberChip(1), ValueTooLowError);
  }

  @Test
  should_not_allow_values_above_12() {
    assert.throws(() => new NumberChip(13), ValueTooHighError);
  }

}
import { tagsMissing } from "./TagsRateScale";
const tagsAmount = 5;
test("Missing tags are displayed properly", () => {
  expect(tagsMissing(tagsAmount)).toEqual(0);
});

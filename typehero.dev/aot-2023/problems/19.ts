import { Expect, Equal } from "type-testing";

type Rebuild<
  Seq extends Array<number>,
  Output extends Array<string> = []
> = Seq extends [
  infer SkateboardCount extends number,
  infer BMXCount extends number,
  infer ScooterCount extends number,
  infer SurboardCount extends number,
  ...infer Rest extends Array<number>
]
  ? [
      ...ExpandItem<SkateboardCount, "🛹">,
      ...ExpandItem<BMXCount, "🚲">,
      ...ExpandItem<ScooterCount, "🛴">,
      ...ExpandItem<SurboardCount, "🏄">,
      ...Rebuild<Rest, Output>
    ]
  : Seq extends [
      infer SkateboardCount extends number,
      infer BMXCount extends number,
      infer ScooterCount extends number,
      infer SurboardCount extends number
    ]
  ? [
      ...ExpandItem<SkateboardCount, "🛹">,
      ...ExpandItem<BMXCount, "🚲">,
      ...ExpandItem<ScooterCount, "🛴">,
      ...ExpandItem<SurboardCount, "🏄">
    ]
  : Seq extends [
      infer SkateboardCount extends number,
      infer BMXCount extends number,
      infer ScooterCount extends number
    ]
  ? [
      ...ExpandItem<SkateboardCount, "🛹">,
      ...ExpandItem<BMXCount, "🚲">,
      ...ExpandItem<ScooterCount, "🛴">
    ]
  : Seq extends [
      infer SkateboardCount extends number,
      infer BMXCount extends number
    ]
  ? [...ExpandItem<SkateboardCount, "🛹">, ...ExpandItem<BMXCount, "🚲">]
  : Seq extends [infer SkateboardCount extends number]
  ? [...ExpandItem<SkateboardCount, "🛹">]
  : [];

type ExpandItem<
  Count extends number,
  Item extends string,
  Acc extends Array<Item> = []
> = Acc["length"] extends Count ? Acc : ExpandItem<Count, Item, [...Acc, Item]>;

type test_0_actual = Rebuild<[2, 1, 3, 3, 1, 1, 2]>;
//   ^?
type test_0_expected = [
  "🛹",
  "🛹",
  "🚲",
  "🛴",
  "🛴",
  "🛴",
  "🏄",
  "🏄",
  "🏄",
  "🛹",
  "🚲",
  "🛴",
  "🛴"
];
type test_0 = Expect<Equal<test_0_expected, test_0_actual>>;

type test_1_actual = Rebuild<[3, 3, 2, 1, 2, 1, 2]>;
//   ^?
type test_1_expected = [
  "🛹",
  "🛹",
  "🛹",
  "🚲",
  "🚲",
  "🚲",
  "🛴",
  "🛴",
  "🏄",
  "🛹",
  "🛹",
  "🚲",
  "🛴",
  "🛴"
];
type test_1 = Expect<Equal<test_1_expected, test_1_actual>>;

type test_2_actual = Rebuild<[2, 3, 3, 5, 1, 1, 2]>;
//   ^?
type test_2_expected = [
  "🛹",
  "🛹",
  "🚲",
  "🚲",
  "🚲",
  "🛴",
  "🛴",
  "🛴",
  "🏄",
  "🏄",
  "🏄",
  "🏄",
  "🏄",
  "🛹",
  "🚲",
  "🛴",
  "🛴"
];
type test_2 = Expect<Equal<test_2_expected, test_2_actual>>;

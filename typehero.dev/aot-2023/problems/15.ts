import { Expect, Equal } from "type-testing";

type BoxToys<
  Toy extends string,
  Count extends number,
  Output extends Array<Toy> = [],
> = {
  [C in Count]: Repeat<Toy, C, Output>;
}[Count];

type Repeat<
  Item extends string,
  Count extends number,
  Output extends Array<Item> = [],
> = Output["length"] extends Count
  ? Output
  : Repeat<Item, Count, [...Output, Item]>;

type test_doll_actual = BoxToys<"doll", 1>;
//   ^?
type test_doll_expected = ["doll"];
type test_doll = Expect<Equal<test_doll_expected, test_doll_actual>>;

type test_nutcracker_actual = BoxToys<"nutcracker", 3 | 4>;
//   ^?
type test_nutcracker_expected =
  | ["nutcracker", "nutcracker", "nutcracker"]
  | ["nutcracker", "nutcracker", "nutcracker", "nutcracker"];
type test_nutcracker = Expect<
  Equal<test_nutcracker_expected, test_nutcracker_actual>
>;

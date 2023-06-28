import { isAvoidFetchNext, multipleOf300 } from "src/features/chats/utils";

describe("chat/utils", () => {
  describe("multipleOf300", () => {
    test("300の倍数の時は+300した値を返す", () => {
      expect(multipleOf300(0)).toBe(300);
      expect(multipleOf300(300)).toBe(600);
      expect(multipleOf300(600)).toBe(900);
    });

    test("300の倍数でない時かつ切り上げた値より120以上小さい場合は、300の倍数になるように切り上げた値を返す", () => {
      expect(multipleOf300(1)).toBe(300);
      expect(multipleOf300(299)).not.toBe(300);
      expect(multipleOf300(299)).toBe(600);
      expect(multipleOf300(301)).toBe(600);
      expect(multipleOf300(599)).not.toBe(600);
    });

    test("消す値が入力値の120以下の場合", () => {
      expect(multipleOf300(120)).toBe(300);
      expect(multipleOf300(121)).toBe(300);
      expect(multipleOf300(299)).toBe(600);
      expect(multipleOf300(301)).toBe(600);
    });
  });

  describe("isAvoidFetchNext", () => {
    test("pageParamsの_gteがtimeより大きい場合はtrueを返す", () => {
      expect(
        isAvoidFetchNext(0, {
          _gte: 1,
          _lt: 300,
        })
      ).toBe(true);

      expect(
        isAvoidFetchNext(600, {
          _gte: 900,
          _lt: 1200,
        })
      ).toBe(true);
    });

    test("pageParamsの間にtimeがいる場合はtrue", () => {
      expect(
        isAvoidFetchNext(600, {
          _gte: 300,
          _lt: 900,
        })
      ).toBe(true);
    });

    test("pageParamsの間にtimeがいない場合はfalse", () => {
      expect(
        isAvoidFetchNext(600, {
          _gte: 300,
          _lt: 600,
        })
      ).toBe(false);
    });

    test("pageParamsの_ltがtimeより小さい場合はfalseを返す", () => {
      expect(
        isAvoidFetchNext(900, {
          _gte: 300,
          _lt: 600,
        })
      ).toBe(false);
    });

    test("pageParamsの_ltがtimeより大きい場合はtrue", () => {
      expect(
        isAvoidFetchNext(300, {
          _gte: 600,
          _lt: 900,
        })
      ).toBe(true);

      expect(
        isAvoidFetchNext(899, {
          _gte: 600,
          _lt: 900,
        })
      ).toBe(true);
    });
  });
});

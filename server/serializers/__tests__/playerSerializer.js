import playerSerializer from "../playerSerializer";

describe("playerSerializer", () => {
  const request_user = {
    id: 1,
    first_name: "Ash",
    last_name: "Ketchum",
    rating: 9000,
    handedness: "left"
  };
  const expected_user = {
    id: 1,
    first_name: "Ash",
    last_name: "Ketchum",
    rating: 9000,
    handedness: "left"
  };

  it("should return a serialized player object", () => {
    const result = playerSerializer(request_user);
    expect(result).toEqual(expected_user);
  });
});

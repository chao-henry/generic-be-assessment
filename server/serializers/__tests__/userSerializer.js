import userSerializer from "../userSerializer";

describe("userSerializer", () => {
  const request_user = {
    id: 1,
    first_name: "Ash",
    last_name: "Ketchum",
    email: "ash.ketchum@localhost.test",
    password: "test_password"
  };
  const expected_user = {
    id: 1,
    first_name: "Ash",
    last_name: "Ketchum",
    email: "ash.ketchum@localhost.test"
  };

  it("should return a serialized user object", () => {
    const result = userSerializer(request_user);
    expect(result).toEqual(expected_user);
  });

  it("should not expose sensitive information", () => {
    const result = userSerializer(request_user);
    expect(result).not.toHaveProperty("password");
  });
});

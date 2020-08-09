
describe('Take out food', function () {

  it('halfPrice', function () {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let test = bestCharge(inputs);
    let expected = `
  ============= 订餐明细 =============
  黄焖鸡 x  1 = 18元
  肉夹馍 x  2 = 12元
  凉皮 x  1 = 8元
  -----------------------------------
  使用优惠:
  指定菜品半价,省13元
  -----------------------------------
  总计：25元
  ===================================`
    expect(test).toEqual(expected)
  })

  it('no promotion', function () {
    let inputs = ["ITEM0013 x 4"];
    let test = bestCharge(inputs);
    let expected = `
  ============= 订餐明细 =============
  肉夹馍 x  4 = 24元
  -----------------------------------
  总计：24元
  ===================================`
    expect(test).toEqual(expected)
  })

  it('30-6', function () {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let test = bestCharge(inputs)
    let expected = `
  ============= 订餐明细 =============
  肉夹馍 x  4 = 24元
  凉皮 x  1 = 8元
  -----------------------------------
  使用优惠:
  满30减6元,省6元
  -----------------------------------
  总计：26元
  ===================================`

    expect(test).toEqual(expected)
  })
})

function bestCharge(selectedItems) {

  var list = dealInput(selectedItems);

  list = Complete(list);

  var result = halfPrice(list);

  var test = '',
     end = '';
  //输出订餐详细的格式
  if (result.item.length == 1) {
    end = result.item[0]
  } else {
    end = result.item[0] + '\n'
    for (let i = 1; i < result.item.length - 1; i++) {
      end = end + '  ' + result.item[i] + '\n'
    }
    end = end + '  ' + result.item[result.item.length - 1]
  }

  //输出格式
  if (result.fullPrice == result.sum) {
    test = `
  ============= 订餐明细 =============
  ${end}
  -----------------------------------
  总计：${result.sum}元
  ===================================`
  } else {
    test = `
  ============= 订餐明细 =============
  ${end}
  -----------------------------------
  使用优惠:
  ${result.type},省${result.fullPrice - result.sum}元
  -----------------------------------
  总计：${result.sum}元
  ===================================`
  }
  return test;
}
//处理输入的函数
function dealInput(arr) {
  var list = [];
  for (let item of arr) {
    let flag = item.indexOf('x');
    var brr = {};
    brr.id = item.substring(0, flag).replace(/\ +/g, "");
    brr.count = item.substring(flag + 1, item.length);
    list.push(brr);
  }
  return list;
}

//对照
function Complete(arr) {
  var allItems = loadAllItems();
  let i, j;
  for (i = 0; i < arr.length; i++) {
    for (j = 0; j < allItems.length; j++) {
      if (arr[i].id === allItems[j].id) {
        arr[i].name = allItems[j].name;
        arr[i].price = Number(allItems[j].price.toFixed(2));
      }
    }
  }
  return arr;
}
//计算两种方式的价格
function halfPrice(arr) {
  var promotions = loadPromotions();
  var temp1 = 0;
  var sum2 = 0
  var i;
  var item = [];
  //明细放进数组
  for (let index of arr) {
    temp1 += (index.price * index.count);
    let main = `${index.name} x ${index.count} = ${index.price * index.count}元`;
    main.toString();
    main = main.replace(/,/g, '\n')
    item.push(main);
  }
  //对半价商品做处理
  for (i = 0; i < arr.length; i++) {
    if (promotions[1].items.includes(arr[i].id)) {
      arr[i].half = arr[i].price / 2;
    } else {
      arr[i].half = arr[i].price;
    }
    sum2 += arr[i].half * arr[i].count;
  }
  sum1 = temp1;
  if (temp1 > 30) {
    sum1 -= 6;
  }
  //返回一个对象，包含详细信息
  var promot = {};
  promot.item = item;
  promot.sum = sum1 > sum2 ? sum2 : sum1;
  promot.fullPrice = temp1;
  if (sum1 <= sum2) {
    promot.type = promotions[0].type;
  } else {
    promot.type = promotions[1].type;
  }
  return promot;

}

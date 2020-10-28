// 瀑布流布局
export function waterFall(container, columns = 5, gap = 10) {
  const box = typeof container === 'string' ? document.querySelector(container) : container
  if (!box) return
  const items = box.children
  // 定义每一列之间的间隙 为10像素
  // const gap = 10
  // 1- 确定列数  = 页面的宽度 / 图片的宽度
  // var pageWidth = getClient().width
  const pageWidth = box.clientWidth
  // const itemWidth = items[0].offsetWidth
  // const columns = parseInt(pageWidth / (itemWidth + gap))
  const arr = []
  let countColumsRecover = 0
  for (let i = 0; i < items.length; i++) {
    const itemWidth = pageWidth / columns - gap + (gap / columns)
    const className = items[i].getAttribute('class')
    items[i].setAttribute('class', className + ' water-fall-item')
    items[i].style.width = columns === 1 ? '100%' : `${itemWidth}px`
    items[i].style.left = (itemWidth + gap) * countColumsRecover + 'px'
    countColumsRecover = countColumsRecover < columns - 1 ? countColumsRecover + 1 : 0
    if (i < columns) {
      // 2- 确定第一行
      // items[i].style.top = 0
      items[i].style.top = 0 // padding
      // items[i].style.left = (itemWidth + gap) * i + 'px' // 24 padding-left：24px
      arr.push(items[i].offsetHeight)
    } else {
      // 其他行
      // 3- 找到数组中最小高度  和 它的索引
      let minHeight = arr[0]
      let index = 0
      for (let j = 0; j < arr.length; j++) {
        if (minHeight > arr[j]) {
          minHeight = arr[j]
          index = j
        }
      }
      // 4- 设置下一行的第一个盒子位置
      // top值就是最小列的高度 + gap
      items[i].style.top = arr[index] + gap + 'px'
      // left值就是最小列距离左边的距离
      // items[i].style.left = items[index].offsetLeft + 'px'
      // items[i].style.left = (itemWidth + gap) * i + 'px'
      // 5- 修改最小列的高度
      // 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
      arr[index] = arr[index] + items[i].offsetHeight + gap
    }
  }
}

// 节流函数
export const delay = (function () {
  let timer = 0
  return function (callback, ms) {
    clearTimeout(timer)
    timer = setTimeout(callback, ms)
    return timer
  }
})()

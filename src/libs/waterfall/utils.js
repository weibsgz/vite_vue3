/**
 * 从给的所有元素中 抽离img元素的方法
 */

export const getImgElements = (itemElements) => {
    const imgElements = []
    itemElements.forEach((el) => {
      imgElements.push(...el.getElementsByTagName('img'))
    })
    return imgElements
  }

/**
 * 
 * 从IMG元素中 抽离所有SRC
 */

export const getAllImg = (imgElements) => {
    console.log('imgElements[0].src',imgElements[0])
    return imgElements.map((imgElement) => {
       if( imgElement.src) {
        console.log('imgElement.src',imgElement.src)
        return imgElement.src
       }
       else {
        
       }
    }) 
  }

/**
 * 监听图片数组加载完成(所有图片都加载完成后),图片加载是异步的所以用promise
 */

export const onCompleteImgs = (imagesSrc) => {
    const promiseAll = [];

    imagesSrc.forEach((img,index) => {
        promiseAll[index] =  new Promise((resovle,reject)=>{
            const imgObj = new Image();   
            console.log('img',img)  
            imgObj.src = img
            imgObj.onload = ()=>{
                resovle({
                    img,
                    index
                })
            }
            // imgObj.onerror = ()=>{
            //     console.log('图片404')
            //     resovle({
            //         img:'',
            //         index
            //     })
            // }
        })
    })

   

    return Promise.all(promiseAll)
}


/**
 * 返回列高对象中的最大的高度
 */
export const getMaxHeight = (columnHeightObj) => {
    const columnHeightArr = Object.values(columnHeightObj)
    return Math.max(...columnHeightArr)
  }

  /**
 * 返回列高对象中的最小高度所在的列
 */
export const getMinHeightColumn = (columnHeightObj) => {
 
    const minHeight = getMinHeight(columnHeightObj)
    return Object.keys(columnHeightObj).find((key) => {
      return columnHeightObj[key] === minHeight
    })
  }


  /**
 * 返回列高对象中的最小的高度
 */
export const getMinHeight = (columnHeightObj) => {
    const columnHeightArr = Object.values(columnHeightObj)
    return Math.min(...columnHeightArr)
  }
  

 
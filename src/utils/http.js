import Taro from '@tarojs/taro';

const config = {
  'url': 'http://',
  'timeout':80000,
  'dataType':'json',
  'mode':'cors',
  'header': {
    'content-type': 'application/json' // 默认值
  }
};

function http(){
  return {
    'loading': 0,
    request(options){
      return options;
    },
    respense(options){
      return options;
    },
    fetch(options){
      const opt = this.request(options);
      //返回null，可以拦截

      if(!opt){
        return ;
      }
      this.loading++;
      Taro.showLoading({
        'title': '加载中'
      });
      return new Promise((resolve, reject)=>{
        Taro.request({...config, ...opt,
          'success':(res)=>{
            const result = this.respense(res);

            resolve(result);
          },
          'fail':(error)=>{
            reject(error);
          },
          'complete':()=>{
            this.loading--;
            if(!this.loading){
              setTimeout(()=>{
                Taro.hideLoading();
              }, 1000);
            }
          }
        });
      });
    },
    get(options){
      return this.fetch({...options, 'method': 'GET'});
    },
    post(options){
      return this.fetch({...options, 'method': 'POST'});
    }
  };

}
export default new http();
import fetch from './fetch.js'
import axios from 'axios'

/*
 * 我的 七牛url：http://p7mnquexm.bkt.clouddn.com/
 * 我的 七牛Key：uySX174_v5dYdzu0rwMcroHZd2AX0dkWGy09MU4B   	AccessKey
 *             f-4zRJDtjybxtLTBVisvkjHVg9JbwuI2zoyYoY1i     SecretKey
 *   pscp w-paper_war.war root@120.79.207.154:/usr/java/new
 *             你看着用
 * */

//七牛
export function uploadQN(dom, o) {
  var domain = 'http://opyzduw4a.bkt.clouddn.com/';
  return new Promise(function (resolve, reject) {
    getQNUploadToken(dom, o).then(function (res) {
      resolve({shortUrl: res.data.key, longUrl: domain + res.data.key})
    }).catch(function (err) {
      reject(err);
    })
  })
}

//阿里OSS
//export function uploadAliOSS(dom) {
//	return new Promise(function(resolve, reject) {
//		getAliOSSUploadToken(dom).then(function(res) {
//			resolve(res)
//		})
//	})
//}
export function getQNUploadToken(dom, o) {
  return new Promise(function (resolve, reject) {
    var file = document.getElementById(dom).files[0]
    if (!file) {
      reject({code: -1})
      return
    }
    //上传类型条件监测
    if (typeof o == 'object') {
      console.log()
      if (o.size && o.type) {
        if (file.size / 1024 / 1024 > o.size || o.type.indexOf(file.type) == -1) {
          //大小，类型不符合
          reject({code: -1})
          return
        }
      } else if (o.size) {
        //仅仅规定了 大小
        if (file.size / 1024 / 1024 > o.size) {
          //大小，类型不符合
          reject({code: -2})
          return
        }

      } else if (o.type) {
        //仅仅规定了 类型
        if (o.type.indexOf(file.type) == -1) {
          //大小，类型不符合
          reject({code: -2})
          return
        }
      }
    }
    axios({
      url: 'http://120.79.207.154:8080/w-paper_war/qiniu/uptoken',
      method: 'GET',
    }).then(function (res) {
      console.log(res, 'QN')
      if (res.data.data) {
        // let d = new Date();
        // let type = file.name.split('.');
        // let tokenParem = {
        //   'putPolicy': '{\"name\":\"$(fname)\",\"size\":\"$(fsize)\",\"w\":\"$(imageInfo.width)\",\"h\":\"$(imageInfo.height)\",\"hash\":\"$(etag)\"}',
        //   'key': 'orderReview/' + d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.valueOf() + '.' + type[type.length - 1],
        //   'bucket': 'http://p7mnquexm.bkt.clouddn.com', //七牛的地址，这个是你自己配置的（变量）
        // };
        let param = new FormData(); //创建form对象
        param.append('token', res.data.data);
        param.append('chunk', '0'); //断点传输
        param.append('chunks', '1');
        param.append('file', file, file.name)
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        };
        axios.post('http://upload-z2.qiniup.com', param, config).then(function (d) {
          resolve(d)
        })
      } else {
        reject('err')
      }
    }).catch(function (err) {
      console.log(err, 'qn错误')
      reject(err);
    })
  })

}

//export function getAliOSSUploadToken(dom) {
//	return new Promise(function(resolve, reject) {
//		fetch({
//			url: 'common/file_manage/ali_oss',
//			method: 'post',
//			data: {}
//		}).then(function(res) {
//			let file = document.getElementById(dom).files[0];
//			var keys = res.data.data;
//			var client = new OSS.Wrapper(keys);
//			var storeAs = 'ali_up_file' + Date.parse( new Date());
//			client.multipartUpload(storeAs, file, {
//				progress:function* (p,c) {
//					console.log(p,'百分比')
//				}
//			}).then(function (result) {
//				resolve({
//					shortUrl:result.name,
//					longUrl:result.url
//				})
//		     }).catch(function (err) {
//		       console.log(err);
//		       reject(err)
//		     });
//		}).catch(function(err) {
//
//		})
//	})
//
//}
//阿里云OSS

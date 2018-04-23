import Cookies from 'js-cookie';


var cookieTools = {

  getKey: function(key) {
    return Cookies.get(key);
  },

  setKey: function (key,value) {
    var cookie;
    cookie = Cookies.set(key, value);
    return cookie;
  },

  clearLogin: function () {
    Cookies.remove('access-token');
  }
};
export default cookieTools;

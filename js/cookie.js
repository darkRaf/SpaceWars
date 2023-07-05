export class Cookie {
  static setCookie(name, value) {
    if (navigator.cookieEnabled) {
      const expires = new Date();
      expires.setTime(expires.getTime() + 180 * 24 * 60 * 60 * 1000);
      const cookieText = `${name}=${value}; expires=${expires.toUTCString}`;

      document.cookie = cookieText;
    }
  }

  static getCookieValue(name = '') {

    if (document.cookie !== '') {
      const cookies = document.cookie.split(/; */);

      for (const cookie of cookies) {
        const [cName, cValue] = cookie.split('=');
        if (cName === name) {
          return cValue;
        }
      }
    }

    return null;
  }

  static getAllCookiesObj() {
    const cookies = document.cookie.split(/; */);
    if (cookies[0] === '') return {};

    const obj = {};

    cookies.forEach(cookie => {
      const [name, value] = cookie.split('=');
      obj[name] = value;
    })

    return obj;
  }

  static deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }

}
